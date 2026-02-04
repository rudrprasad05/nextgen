using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Models.DTO;

namespace Backend.Mappers
{
    public interface IPageMapper
    {
        PageDto FromModelToDtoAsync(Page request);
        List<PageDto> FromModelToDtoAsync(ICollection<Page> request);
    }
    public class PageMapper : IPageMapper
    {
        public PageDto FromModelToDtoAsync(Page request)
        {
            if (request == null)
                return new PageDto();

            var dto = new PageDto
            {
                Id = request.Id,
                CreatedOn = request.CreatedOn,
                UpdatedOn = request.UpdatedOn,
                IsDeleted = request.IsDeleted,
                Title = request.Title,
                Slug = request.Slug,
                Schema = request.Schema,
                Status = request.Status,
            };

            return dto;

        }

        public List<PageDto> FromModelToDtoAsync(ICollection<Page> request)
        {
            var dtoList = new List<PageDto>();
            foreach (var media in request)
            {
                var dto = FromModelToDtoAsync(media);
                dtoList.Add(dto);
            }

            return dtoList;
        }
    }
}