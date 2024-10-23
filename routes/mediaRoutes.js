import express from 'express';
import multer from 'multer';
import minioClient from '../config/minioClient.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();  // Store files in memory temporarily
const upload = multer({ storage });

// Upload endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const bucketName = 'uploads';
  const fileName = Date.now() + '-' + file.originalname;

  try {
    // Upload the file to MinIO
    await minioClient.putObject(bucketName, fileName, file.buffer, file.size, {
      'Content-Type': file.mimetype,
    });

    // Return file URL for accessing
    const fileUrl = `http://localhost:9000/${bucketName}/${fileName}`;
    res.status(200).json({ message: 'File uploaded successfully', fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

export default router;
