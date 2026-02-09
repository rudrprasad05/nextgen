using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Models.DTO;

namespace Backend.Mappers
{
    public interface ISiteMapper
    {
        Task<OnlySiteDto> FromModelToOnlyDtoAsync(Site request);
        Task<SiteDto> FromModelToDtoAsync(Site request);
        Task<List<OnlySiteDto>> FromModelToOnlyDtoAsync(ICollection<Site> request);
    }

    public class SiteMapper : ISiteMapper
    {
        private readonly ApplicationDbContext _db;
        private readonly IMediaMapper _mediaMapper;
        private readonly IPageMapper _pageMapper;

        public SiteMapper(ApplicationDbContext db, IMediaMapper mediaMapper, IPageMapper pageMapper)
        {
            _db = db;
            _mediaMapper = mediaMapper;
            _pageMapper = pageMapper;
        }

        public async Task<OnlySiteDto> FromModelToOnlyDtoAsync(Site request)
        {
            if (request == null)
                return new OnlySiteDto();

            var dto = new OnlySiteDto
            {
                Id = request.Id,
                CreatedOn = request.CreatedOn,
                UpdatedOn = request.UpdatedOn,
                IsDeleted = request.IsDeleted,
                Name = request.Name,
                Slug = request.Slug,
                OwnerId = request.OwnerId,
                Status = request.Status,
                NumberOfPages = request.Pages.Count,

            };

            if (request.Screenshot != null)
            {
                dto.Screenshot = await _mediaMapper.ToDtoAsync(request.Screenshot);
            }

            return dto;
        }

        public async Task<SiteDto> FromModelToDtoAsync(Site request)
        {
            if (request == null)
                return new SiteDto();

            var dto = new SiteDto
            {
                Id = request.Id,
                CreatedOn = request.CreatedOn,
                UpdatedOn = request.UpdatedOn,
                IsDeleted = request.IsDeleted,
                Name = request.Name,
                Slug = request.Slug,
                OwnerId = request.OwnerId,
                Status = request.Status,
                NumberOfPages = request.Pages.Count,

            };

            if (request.Screenshot != null)
            {
                dto.Screenshot = await _mediaMapper.ToDtoAsync(request.Screenshot);
            }
            if (request.Pages != null)
            {
                dto.Pages = _pageMapper.FromModelToDtoAsync(request.Pages);
            }

            return dto;
        }


        public async Task<List<OnlySiteDto>> FromModelToOnlyDtoAsync(ICollection<Site> request)
        {
            var dtoList = new List<OnlySiteDto>();
            foreach (var media in request)
            {
                var dto = await FromModelToOnlyDtoAsync(media);
                dtoList.Add(dto);
            }

            return dtoList;
        }
    }
}