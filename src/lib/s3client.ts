import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  credentials: new AWS.Credentials(
    process.env.AWS_ACCESS_KEY_ID!,
    process.env.AWS_SECRET_ACCESS_KEY!
  ),
});

const s3 = new AWS.S3();

export const uploadToS3 = async (fileName: string, fileContent: Buffer): Promise<string> => {
  const bucketName = process.env.S3_BUCKET_NAME!;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ACL: 'public-read',
    ContentType: 'image/jpeg', // Adjust if needed
  };

  await s3.upload(params).promise();
  return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
};
