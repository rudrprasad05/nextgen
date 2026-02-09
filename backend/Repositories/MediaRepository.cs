using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Backend.Interfaces;
using Backend.Data;
using Backend.Models.Response;
using Backend.Models.DTO;
using Backend.Models.Request;
using Backend.Mappers;

namespace Backend.Repositories
{
    public class MediaRepository : IMediaRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAmazonS3Service _s3Service;
        private readonly IMediaMapper _mediaMapper;

        public MediaRepository(IMediaMapper mediaMapper, IAmazonS3Service s3Service, ApplicationDbContext context)
        {
            _context = context;
            _s3Service = s3Service;
            _mediaMapper = mediaMapper;
        }
        public async Task<ApiResponse<double>> SumStorage()
        {
            // var sizes = await _context.Medias.Select(m => m.SizeInBytes).ToListAsync();
            var data = await _context.Medias.SumAsync(m => m.SizeInBytes);

            return new ApiResponse<double>
            {
                Success = true,
                StatusCode = 200,
                Message = "ok",
                Data = data
            };
        }

        public async Task<ApiResponse<MediaDto>> CreateAsync(Media media, IFormFile? file)
        {
            if (file == null || media == null) return ApiResponse<MediaDto>.Fail(message: "media null");

            using var transaction = await _context.Database.BeginTransactionAsync();

            var guid = Guid.NewGuid();
            var fileExtension = Path.GetExtension(file.FileName);

            try
            {
                var fileUrl = await _s3Service.UploadFileAsync(file);
                using var stream = file.OpenReadStream();

                if (string.IsNullOrWhiteSpace(fileUrl))
                {
                    return ApiResponse<MediaDto>.Fail(message: "S3 upload failed");
                }

                var newMedia = new Media
                {
                    AltText = media.AltText,
                    ObjectKey = fileUrl,
                    Id = guid,
                    ContentType = media.ContentType,
                    FileName = media.FileName,
                    SizeInBytes = media.SizeInBytes,
                    ShowInGallery = media.ShowInGallery,
                    OwnerId = media.OwnerId,
                };

                if (newMedia == null)
                {
                    return ApiResponse<MediaDto>.Fail();
                }

                await _context.Medias.AddAsync(newMedia);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                var dto = await _mediaMapper.ToDtoAsync(newMedia);

                return ApiResponse<MediaDto>.Ok(data: dto);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }

        }

        public async Task<ApiResponse<List<Media>>> GetAll(RequestQueryObject queryObject)
        {
            var media = _context.Medias.AsQueryable();

            if (queryObject.IsDeleted.HasValue)
            {
                media = media.Where(m => m.IsDeleted == queryObject.IsDeleted.Value);
            }
            else
            {
                media = media.Where(m => m.IsDeleted == false);
            }

            var totalCount = await media.CountAsync();
            var skip = (queryObject.PageNumber - 1) * queryObject.PageSize;
            var res = await media
                .Skip(skip)
                .Take(queryObject.PageSize)
                .ToListAsync();
            var signedMedia = new List<Media>();

            foreach (var item in res)
            {
                var signedUrl = await _s3Service.GetImageSignedUrl(item.ObjectKey);

                item.Url = signedUrl;
                signedMedia.Add(item);
            }

            return new ApiResponse<List<Media>>
            {
                Success = true,
                StatusCode = 200,
                Data = signedMedia,
                Meta = new MetaData
                {
                    TotalCount = totalCount,
                    PageNumber = queryObject.PageNumber,
                    PageSize = queryObject.PageSize
                }
            };

        }
        public async Task<ApiResponse<MediaDto>> UpdateAsync(Guid uuid, Media media, IFormFile? file)
        {
            var existingMedia = await _context.Medias.FirstOrDefaultAsync((m) => m.Id == uuid);
            if (existingMedia == null)
            {
                return new ApiResponse<MediaDto>
                {
                    Success = false,
                    StatusCode = 400,
                    Message = "file was null"
                };
            }
            ;

            if (file != null)
            {
                var fileUrl = await _s3Service.UploadFileAsync(file);
                if (fileUrl == null)
                {
                    return new ApiResponse<MediaDto>
                    {
                        Success = false,
                        StatusCode = 400,
                        Message = "file url not provided"
                    };
                }

                existingMedia.Url = fileUrl;
                existingMedia.ObjectKey = fileUrl;
            }

            existingMedia.AltText = media.AltText;
            existingMedia.FileName = media.FileName;
            existingMedia.ShowInGallery = media.ShowInGallery;

            await _context.SaveChangesAsync();

            var dto = await _mediaMapper.ToDtoAsync(existingMedia);

            return new ApiResponse<MediaDto>
            {
                Success = true,
                StatusCode = 200,
                Message = "ok",
                Data = dto
            };
        }
        public async Task<ApiResponse<MediaDto>> GetOne(RequestQueryObject queryObject)
        {
            var uuid = queryObject.UUID;
            if (uuid.HasValue != true || uuid.Value == Guid.Empty)
            {
                return ApiResponse<MediaDto>.Fail(message: "invalid uuid");
            }

            var mediaQ = _context.Medias.AsQueryable();
            var media = await mediaQ.FirstOrDefaultAsync(m => m.Id == uuid);

            if (media == null)
            {
                return new ApiResponse<MediaDto>
                {
                    Success = false,
                    StatusCode = 400,
                    Message = "file was null"
                };
            }


            var dto = await _mediaMapper.ToDtoAsync(media);


            return new ApiResponse<MediaDto>
            {
                Success = true,
                StatusCode = 200,
                Message = "ok",
                Data = dto
            };
        }
        public async Task<ApiResponse<MediaDto>> SafeDelete(Guid uuid)
        {
            var media = await Exists(uuid);
            if (media == null)
            {
                return new ApiResponse<MediaDto>
                {
                    Success = false,
                    StatusCode = 400,
                    Message = "media was null"
                };
            }
            media.IsDeleted = true;

            await _context.SaveChangesAsync();
            var dto = await _mediaMapper.ToDtoAsync(media);


            return new ApiResponse<MediaDto>
            {
                Success = true,
                StatusCode = 200,
                Data = dto
            };
        }
        public async Task<Media?> Exists(Guid? uuid)
        {
            if (uuid == null)
            {
                return null;
            }

            var media = await _context.Medias.FirstOrDefaultAsync(c => c.Id == uuid);
            return media;
        }

        public async Task<ApiResponse<MediaDto>> SoftDelete(RequestQueryObject queryObject)
        {
            var product = await _context.Medias
                .FirstOrDefaultAsync(p => p.Id == queryObject.UUID);
            if (product == null)
            {
                return ApiResponse<MediaDto>.NotFound();
            }

            product.IsDeleted = true;
            product.UpdatedOn = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var productDto = await _mediaMapper.ToDtoAsync(product);
            return ApiResponse<MediaDto>.Ok(productDto);
        }

        public async Task<ApiResponse<MediaDto>> Activate(RequestQueryObject queryObject)
        {
            var product = await _context.Medias
                .FirstOrDefaultAsync(p => p.Id == queryObject.UUID);
            if (product == null)
            {
                return ApiResponse<MediaDto>.NotFound();
            }

            product.IsDeleted = false;
            product.UpdatedOn = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var productDto = await _mediaMapper.ToDtoAsync(product);
            return ApiResponse<MediaDto>.Ok(productDto);
        }
    }
}