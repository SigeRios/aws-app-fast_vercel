mkdir Layer
cd Layer
mkdir python
cd python
pip install --target . mangum hugchat requests pydantic fastapi
cd ..
cd..

# Create a zip file with the contents of the package directory
Compress-Archive -Path .\Layer\* -DestinationPath .\layer.zip
