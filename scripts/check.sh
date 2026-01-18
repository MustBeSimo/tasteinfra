#!/bin/bash
# Check the project for common issues

echo "Checking project structure..."
FILES=("index.html" "src/lib/animations.js" "src/styles/main.css" "generate_pptx.py")

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file found"
    else
        echo "✗ $file missing"
        exit 1
    fi
done

echo "Running pptx generation test..."
source venv/bin/activate
python3 generate_pptx.py

if [ -f "Taste_Infrastructure_Manifesto.pptx" ]; then
    echo "✓ PPTX generation successful"
else
    echo "✗ PPTX generation failed"
    exit 1
fi

echo "All checks passed."
