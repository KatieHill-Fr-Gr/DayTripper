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