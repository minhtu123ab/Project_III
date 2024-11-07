import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from './Cloudinary'

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'movie_posters',
    allowed_formats: ['jpg', 'png']
  } as {
    folder: string
    allowed_formats: string[]
  }
})

const upload = multer({ storage })

export default upload
