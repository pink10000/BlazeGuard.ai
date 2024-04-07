from pathlib import Path
from PIL import Image

def check_images(directory):
    for img_path in Path(directory).rglob('*.jpg'):  # Adjust the pattern as necessary
        try:
            with Image.open(img_path) as img:
                img.verify()  # verify that it is, in fact, an image
        except (IOError, SyntaxError) as e:
            print(f'Bad file: {img_path} -> {e}')

# Example usage:
check_images('data/train')