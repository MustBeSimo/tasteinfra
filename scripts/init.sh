#!/bin/bash
# Initialize the project environment

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Install dependencies
echo "Installing dependencies..."
source venv/bin/activate
pip install beautifulsoup4 python-pptx

echo "Initialization complete."
