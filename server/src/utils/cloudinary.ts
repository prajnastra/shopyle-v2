import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import streamifier from 'streamifier'
import { Express } from 'express'

const streamUpload = (
  file: Express.Multer.File
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result)
      } else {
        reject(error)
      }
    })

    streamifier.createReadStream(file.buffer).pipe(stream)
  })
}

export const upload = async (file: Express.Multer.File) => {
  let result = await streamUpload(file)
  return result
}
