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
        Task<OnlySiteDto> FromModelToDtoAsync(Site request);
        Task<List<OnlySiteDto>> FromModelToDtoAsync(ICollection<Site> request);
    }

    public class SiteMapper : ISiteMapper
    {
        private readonly ApplicationDbContext _db;

        public SiteMapper(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<OnlySiteDto> FromModelToDtoAsync(Site request)
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

            return dto;
        }

        public async Task<List<OnlySiteDto>> FromModelToDtoAsync(ICollection<Site> request)
        {
            var dtoList = new List<OnlySiteDto>();
            foreach (var media in request)
            {
                var dto = await FromModelToDtoAsync(media);
                dtoList.Add(dto);
            }

            return dtoList;
        }
    }
}