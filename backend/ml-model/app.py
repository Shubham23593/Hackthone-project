from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load the trained model
try:
    model = tf.keras.models.load_model('disease_model.h5')
except:
    print("Warning: disease_model.h5 not found. Please train the model first.")
    model = None

# Class mapping based on training indices
CLASSES = [
    'Acne', 'Actinic_Keratosis', 'Benign_tumors', 'Bullous', 
    'Candidiasis', 'DrugEruption', 'Eczema', 'Infestations_Bites', 
    'Lichen', 'Lupus', 'Moles', 'Psoriasis', 'Rosacea', 
    'Seborrh_Keratoses', 'SkinCancer', 'Sun_Sunlight_Damage', 
    'Tinea', 'Unknown_Normal', 'Vascular_Tumors', 'Vasculitis', 
    'Vitiligo', 'Warts'
]

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0 # Normalize
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    img_bytes = file.read()
    
    img_array = preprocess_image(img_bytes)
    
    # Predict
    predictions = model.predict(img_array)
    max_prob = np.max(predictions[0])
    class_idx = np.argmax(predictions[0])
    
    if max_prob < 0.5:
        return jsonify({
            'disease': 'prediction uncertain',
            'confidence': float(max_prob)
        })
        
    predicted_class = CLASSES[class_idx]
    
    return jsonify({
        'disease': predicted_class,
        'confidence': float(max_prob)
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)