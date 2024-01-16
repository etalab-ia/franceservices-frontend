#!/bin/bash

# Define the directory to search in. By default, it's the current directory.
# You can modify it to any specific directory path or pass it as an argument.
DIR=${1:-.}

# Counting .jsx and .js files, excluding node_modules
JSX_JS_COUNT=$(find $DIR -type d -name 'node_modules' -prune -o -type f \( -name "*.jsx" -o -name "*.js" \) -print | wc -l)

# Counting .tsx and .ts files, excluding node_modules
TSX_TS_COUNT=$(find $DIR -type d -name 'node_modules' -prune -o -type f \( -name "*.tsx" -o -name "*.ts" \) -print | wc -l)

echo "Number of .jsx/.js files: $JSX_JS_COUNT"
echo "Number of .tsx/.ts files: $TSX_TS_COUNT"
