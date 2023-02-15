import { Request, Response } from 'express'
import { upload } from '../utils'

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'No file found in your request',
    })
  }

  const result = await upload(req.file)

  return res.status(200).json({
    message: 'ok',
    url: result.url,
  })
}
