import express from 'express'
import multer from 'multer'

// import { isSignedIn, isAdmin, isAuthenticated } from '../controllers/auth'
import { uploadImage } from '../controllers/upload'

const router = express.Router()
const fileUpload = multer()

//create
router.post('/upload/', fileUpload.single('file'), uploadImage)

export default router
