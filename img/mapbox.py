import requests
from PIL import Image
from io import BytesIO
from time import sleep
import os

api_token = open("img/token.txt", "r").readline()
save_dir = "img/api_dump"

# zoom level as determined by ml model
def download_mapbox_image(lat, long, access_token, zoom=15.31):
    url = f"https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/{long},{lat},{zoom},0/250x275?access_token={access_token}"
    
    # Download the image
    response = requests.get(url)
    if response.status_code == 200:
        # Open the image and crop it
        image = Image.open(BytesIO(response.content))
        cropped_image = image.crop((0, 0, 250, 250))  # Left, Top, Right, Bottom
        
        os.makedirs(save_dir, exist_ok=True)
        
        # Save the image with the filename being "longitude-latitude-"
        filename = f"{long},{lat}.png"
        file_path = os.path.join(save_dir, filename)
        cropped_image.save(file_path)
        print(f"Image saved as {filename}")
    else:
        print(f"Failed to download image: Status code {response.status_code}")

    sleep(0.1)

# Example usage
zoom_level = 15.31


# Top L Search: 39.66054625849576, -121.69016388533797
# Top R Search: 39.76409884197757, -120.43509650103651
# Bot R Search: 38.93644334633029, -120.30288943513511 

tl = {"lat" : 39.66054625849576, "long" : -121.69016388533797}
br = {"lat" : 38.93644334633029, "long" : -120.30288943513511}


# recovered from https://forest.moscowfsl.wsu.edu/fswepp/rc/kmlatcon.html
debug_mult = 3
lat_step = debug_mult * 0.00902 
long_step = debug_mult * 0.01156 

lat = tl["lat"]
while lat > br["lat"]: 
    long = tl["long"]
    while long < br["long"]: 
        download_mapbox_image(lat, long, api_token)
        # print(lat, long)
        long += long_step
    lat -= lat_step


# download_mapbox_image(tl["lat"], tl["long"], api_token)
