
## Commands to run

npm install
npm install --arch=x64 --platform=linux --target=12.13.0 sharp
npm run prestart

sls package
sls deploy

## Command to upload file

curl --upload-file {local_image_path} --request PUT --url "{URL}"

Example: curl --upload-file ../image.jpg "https://...."
