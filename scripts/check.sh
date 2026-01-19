#!/bin/bash
# Check the project for common issues

echo "Checking project structure..."
FILES=("index.html" "src/lib/animations.js" "src/styles/main.css")

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file found"
    else
        echo "✗ $file missing"
        exit 1
    fi
done

echo "All checks passed."
