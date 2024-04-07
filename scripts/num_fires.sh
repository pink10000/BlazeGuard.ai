#!/bin/bash

# input csvs path
folder_path="./state_fires"

map_string="export const firesCount = {"

for file in "$folder_path"/*; do
    # filename without extension
    filename=$(basename -- "$file")
    filename_no_ext="${filename%.*}"

    # lines in the file
    num_lines=$(wc -l < "$file")
    num_lines=$((num_lines - 1))

    # Add the filename and number of lines to the map string
    map_string="$map_string\n    \"$filename_no_ext\": $num_lines,"
done

# Add the closing bracket for the JavaScript map
map_string="$map_string\n};"

echo -e "$map_string"
