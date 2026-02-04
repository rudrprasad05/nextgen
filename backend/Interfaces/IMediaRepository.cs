using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Models.DTO;
using Backend.Models.Request;
using Backend.Models.Response;

namespace Backend.Interfaces
{
    public interface IMediaRepository
    {
        public Task<ApiResponse<MediaDto>> UpdateAsync(Guid uuid, Media media, IFormFile? file);
        public Task<ApiResponse<MediaDto>> CreateAsync(Media media, IFormFile? file);
        public Task<ApiResponse<MediaDto>> GetOne(RequestQueryObject queryObject);
        public Task<ApiResponse<List<Media>>> GetAll(RequestQueryObject queryObject);
        public Task<Media?> Exists(Guid? uuid);
        public Task<ApiResponse<MediaDto>> SoftDelete(RequestQueryObject queryObject);
        public Task<ApiResponse<MediaDto>> Activate(RequestQueryObject queryObject);

        public Task<ApiResponse<double>> SumStorage();
    }
}