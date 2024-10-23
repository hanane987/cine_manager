import minioClient from '../config/minioClient.js';

// Example: Function to upload a file to MinIO
export const uploadFile = async (req, res) => {
  try {
    const file = req.file;  // Assuming file comes from form or upload middleware
    const bucketName = 'your-bucket-name';
    const fileName = file.originalname;
    const fileStream = file.buffer;

    // Check if bucket exists, create if not
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, 'us-east-1'); // Set the region appropriately
    }

    // Upload file to MinIO
    await minioClient.putObject(bucketName, fileName, fileStream);
    res.status(200).json({ message: 'File uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file', details: error.message });
  }
};
