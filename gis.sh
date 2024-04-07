#! /usr/bin/env nix-shell
#! nix-shell -i bash -p gdal -p imagemagick
#!/usr/bin/env bash

# Convert Landsat 8 GeoTIFF images into RGB pan-sharpened JPEGs.
#
# Requirements:
#              * gdal http://www.mapbox.com/tilemill/docs/guides/gdal/
#              * convert (image-magick)
#
# Reference info:
#                 http://www.mapbox.com/blog/putting-landsat-8-bands-to-work/
#                 http://www.mapbox.com/tilemill/docs/guides/gdal/
#                 http://www.mapbox.com/blog/processing-landsat-8/
#                 http://earthexplorer.usgs.gov/


if [[ -z "$1" ]]; then
	echo "Landsat image processing"
	echo ""
	echo "Converts to 8-bit, merges RGB, pan-sharpens, colour corrects and converts to JPG"
	echo "Example: process_landsat LC82010242013198LGN00"
	echo ""
	exit 0
fi

if [ ! -f ./"$1"_B2.TIF ]; then
	echo "File not found!"
	exit 0
fi

if [ ! -d "$DIRECTORY" ]; then
	mkdir tmp
fi	

# Convert 16-bit images into 8-bit and tweak levels
for BAND in {8,4,3,2}; do
	gdalwarp -t_srs EPSG:3857 "$1"_B"$BAND".TIF ./tmp/b"$BAND"-projected.tif;
	gdal_contrast_stretch -ndv 0 -linear-stretch 70 30 ./tmp/b"$BAND"-projected.tif ./tmp/b"$BAND"-8bit.tif;
done

# Merge RGB bands into one image
gdal_merge_simple -in ./tmp/b4-8bit.tif -in ./tmp/b3-8bit.tif -in ./tmp/b2-8bit.tif -out ./tmp/rgb.tif

# Pan-sharpen RGB image
gdal_landsat_pansharp -rgb ./tmp/rgb.tif -lum ./tmp/rgb.tif 0.25 0.23 0.52 -pan ./tmp/b3-8bit.tif -ndv 0 -o ./tmp/pan.tif

# Colour correct and convert to JPG
convert -verbose -channel B -gamma 0.8 -quality 95 ./tmp/pan.tif final-pan-rgb-corrected.jpg

echo "Finished."

