#!/bin/bash


URL="https://www.data.gouv.fr/fr/datasets/r/afc3f97f-0ef5-429b-bf16-7b7876d27cd4"

TEMP_FILE="temp_file.csv"

FINAL_FILE="mfs.csv"

curl -L -o $TEMP_FILE $URL

# Check if the file was downloaded and has more than 1 line (header included)
if [ -s $TEMP_FILE ] && [ $(wc -l < $TEMP_FILE) -ge 2 ]; then
    # Extracting the id_fs and lib_fs columns
    # Adjust the column numbers (e.g., 1,2) based on your CSV's structure
    awk -F, '{print $1 "," $3}' $TEMP_FILE > $FINAL_FILE

    rm $TEMP_FILE
else
    echo "The downloaded file is empty or does not exist."
fi
