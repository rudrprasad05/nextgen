using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Amazon;
using Backend.Interfaces;

namespace Backend.Services
{
    public class AmazonS3Service : IAmazonS3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;
        private readonly string _folderName;
        private readonly string _serviceUrl;

        public AmazonS3Service(IAmazonS3 s3Client, IConfiguration configuration)
        {
            _s3Client = s3Client ?? throw new ArgumentNullException(nameof(s3Client));

            var aws = configuration.GetSection("AWS_S3");
            _bucketName = aws["BucketName"] ?? throw new InvalidOperationException("AWS_S3:BucketName missing");
            _folderName = aws["FolderName"] ?? throw new InvalidOperationException("AWS_S3:FolderName missing");
            _serviceUrl = aws["ServiceURL"] ?? throw new InvalidOperationException("AWS_S3:ServiceURL missing");
        }

        public async Task<string> GetImageSignedUrl(string key)
        {
            var url = await _s3Client.GetPreSignedURLAsync(new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(15)
            });
            url = url.Replace("com/mctechfiji", "com", StringComparison.OrdinalIgnoreCase);

            return url;
        }

        public async Task<GetObjectResponse?> GetObjectAsync(string objKey)
        {
            try
            {
                var request = new GetObjectRequest
                {
                    BucketName = _bucketName,
                    Key = objKey
                };

                var response = await _s3Client.GetObjectAsync(request);
                return response;
            }
            catch (AmazonS3Exception ex)
            {
                Console.WriteLine($"S3 Error: {ex.Message}");
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
                return null;
            }
        }
        public async Task<string?> UploadFileAsync(IFormFile file)
        {
            var accessKey = Environment.GetEnvironmentVariable("AWS_S3__AccessKey");
            var secretKey = Environment.GetEnvironmentVariable("AWS_S3__SecretKey");
            var bucketName = Environment.GetEnvironmentVariable("AWS_S3__BucketName");
            var folderName = Environment.GetEnvironmentVariable("AWS_S3__FolderName");
            var regionName = Environment.GetEnvironmentVariable("AWS_S3__Region");

            var region = RegionEndpoint.GetBySystemName(regionName);

            using var s3Client = new AmazonS3Client(accessKey, secretKey, region);
            using var transferUtility = new TransferUtility(s3Client);

            var objectKey = $"{folderName}/{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

            using var fileStream = file.OpenReadStream();
            var request = new TransferUtilityUploadRequest
            {
                InputStream = fileStream,
                BucketName = bucketName,
                Key = objectKey,
                ContentType = file.ContentType
            };

            await transferUtility.UploadAsync(request);

            return objectKey;
        }

        public async Task<bool> DeleteFileAsync(string fileName)
        {
            try
            {
                // Construct the delete request
                var request = new DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = _folderName + "/" + fileName
                };

                // Delete the object from S3
                var response = await _s3Client.DeleteObjectAsync(request);

                // Return true if the deletion was successful
                return response.HttpStatusCode == System.Net.HttpStatusCode.NoContent;
            }
            catch (AmazonS3Exception ex)
            {
                // Handle S3 exceptions
                Console.WriteLine($"S3 Error: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                // Handle general errors
                Console.WriteLine($"General Error: {ex.Message}");
                return false;
            }
        }
    }
}