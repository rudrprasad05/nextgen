
using Backend.Interfaces;
using Backend.Models;
using Backend.Models.DTO;

namespace Backend.Mappers
{
    public interface IMediaMapper
    {
        Task<MediaDto> ToDtoAsync(Media media);
        Task<List<MediaDto>> FromModelToDtoAsync(ICollection<Media> request);

        Task<Media> FromDtoToModelAsync(MediaDto? media);
        Task<List<Media>> FromDtoToModelAsync(ICollection<MediaDto> request);


    }

    public class MediaMapper : IMediaMapper
    {
        private readonly IAmazonS3Service _s3Service;

        public MediaMapper(IAmazonS3Service azureBlobService)
        {
            _s3Service = azureBlobService;
        }

        public async Task<Media> FromDtoToModelAsync(MediaDto? media)
        {
            if (media == null)
            {
                return new Media();
            }
            var signedUrl = await _s3Service.GetImageSignedUrl(media.ObjectKey ?? "");
            return new Media
            {
                Id = media.Id,
                AltText = media.AltText,
                FileName = media.FileName,
                ContentType = media.ContentType,
                SizeInBytes = media.SizeInBytes,
                Url = signedUrl ?? media.Url,
                ObjectKey = media.ObjectKey ?? "",
                ShowInGallery = media.ShowInGallery,
                IsDeleted = media.IsDeleted,
            };
        }

        public async Task<List<Media>> FromDtoToModelAsync(ICollection<MediaDto> request)
        {
            var dtoList = new List<Media>();
            foreach (var media in request)
            {
                var dto = await FromDtoToModelAsync(media);
                dtoList.Add(dto);
            }

            return dtoList;
        }

        public async Task<List<MediaDto>> FromModelToDtoAsync(ICollection<Media> request)
        {
            var dtoList = new List<MediaDto>();
            foreach (var media in request)
            {
                var dto = await ToDtoAsync(media);
                dtoList.Add(dto);
            }

            return dtoList;
        }

        public async Task<MediaDto> ToDtoAsync(Media media)
        {
            if (media == null)
                return new MediaDto { };

            var signedUrl = await _s3Service.GetImageSignedUrl(media.ObjectKey);


            return new MediaDto
            {
                Id = media.Id,
                AltText = media.AltText,
                FileName = media.FileName,
                ContentType = media.ContentType,
                SizeInBytes = media.SizeInBytes,
                Url = signedUrl ?? media.Url,
                ObjectKey = media.ObjectKey ?? "",
                ShowInGallery = media.ShowInGallery,
                IsDeleted = media.IsDeleted,

            };
        }
    }

}

