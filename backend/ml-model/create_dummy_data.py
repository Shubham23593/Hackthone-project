import os
from PIL import Image

# Update this to your exact dataset path if different
DATASET_PATH = r'C:\Users\Shubham\Downloads\HEALTHCARE\dataset\skin_disease_images\train'
CLASSES = ['acne', 'eczema', 'melanoma', 'normal', 'psoriasis']

def create_dummy_images():
    for disease in CLASSES:
        folder_path = os.path.join(DATASET_PATH, disease)
        os.makedirs(folder_path, exist_ok=True)
        
        # Create 10 dummy images per class
        for i in range(10):
            img = Image.new('RGB', (224, 224), color=(73, 109, 137))
            img_path = os.path.join(folder_path, f'dummy_{i}.jpg')
            img.save(img_path)
            
    print(f"Successfully created dummy images in: {DATASET_PATH}")

if __name__ == '__main__':
    create_dummy_images()