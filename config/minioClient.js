import { Client } from 'minio';

// Initialize MinIO client connection
const minioClient = new Client({
  endPoint: 'localhost',  // If MinIO is running locally
  port: 9000,             // Default port for MinIO
  useSSL: false,          // Set to true if using HTTPS
  accessKey: 'your-access-key',  // Replace with your MinIO access key
  secretKey: 'your-secret-key',  // Replace with your MinIO secret key
});

// Ensure the 'uploads' bucket exists or create it
const bucketName = 'uploads';

(async () => {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`Bucket "${bucketName}" created successfully`);
    } else {
      console.log(`Bucket "${bucketName}" already exists`);
    }
  } catch (error) {
    console.error('Error creating bucket:', error);
  }
})();

export default minioClient;
