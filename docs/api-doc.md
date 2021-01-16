Base URL: 
```https://{unique-id}.execute-api.${region}.amazonaws.com/dev/```

**API to generate signed URL**
----
  Return a signed url which can be used to upload image file to S3 bucket.

**POST** /upload

Header:
```json
{ "filename": "tesla.jpg" }
```

Response:
```json 
{
    "signed-url": "https://url-link"
}
```

After getting signed url, you can use curl request to upload the image file.

```
curl --upload-file ../image.jpg "https://url-link"
```

**Search Image API**
----
  Returns json list of images.

**GET** /search?name=tesla

Response:
```json
{
    "list": [
        {
            "FileName": "tesla.jpg",
            "Size": 1811810,
            "CreatedAt": "Sat Jan 16 2021 17:06:19 GMT+0000 (Coordinated Universal Time)"
        }
    ]
}
```

**Delete Image API**
----
  This is used to delete particular image.

**DELETE** /image/{imageFullName}

Success Response:
```json
{ "success": true }
```

Error Response:
```json
{
    "message": "No file exists with given input file name."
}
```