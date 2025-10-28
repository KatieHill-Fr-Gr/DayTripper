import { cloudinary } from './cloudinary.js'
import streamifier from 'streamifier'

export default function cloudinaryUpload(fileBuffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'profile-images' },
            (err, result) => {
                if (result) resolve(result)
                    else reject(err)
            }
        )
        streamifier.createReadStream(fileBuffer).pipe(stream)
    })
}



 // * Upload Cloudinary from frontend:

 // 1) Create signture on backend (using the API secret key)
 // 2) Store the Cloudinary URL on the backend
 // 3) Add the axios call and image upload logic to the ejs template on the frontend

 // Keep it unsigned