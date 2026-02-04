using Backend.Interfaces;

using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

using DotNetEnv;
using Microsoft.AspNetCore.Authorization;
using StackExchange.Redis;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Backend.Data;
using Backend.Models.Response;
using Backend.Middleware;
using Microsoft.Extensions.Options;
using Azure.Storage;
using Amazon.S3;
using Amazon;
using Backend.Services;
using Backend.Config;
using Backend.Mappers;
using Backend.Repositories;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Configuration.AddEnvironmentVariables();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices();
builder.Services.AddDatabaseContext(builder.Configuration);
builder.Services.AddRedisContext(builder.Configuration);
builder.Services.AddIdentityService();
builder.Services.AddAuthentication(builder.Configuration);
builder.Services.AddAuthorization();

builder.Services.Configure<HostOptions>(options =>
{
    options.BackgroundServiceExceptionBehavior = BackgroundServiceExceptionBehavior.Ignore;
});

builder.Services.AddControllers()
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// // DI Mappers
// builder.Services.AddScoped<IMediaMapper, MediaMapper>();

// builder.Services.AddScoped<IMediaRepository, MediaRepository>();
// builder.Services.AddScoped<IUserRepository, UserRepository>();
// builder.Services.AddScoped<ISocialMediaRepository, SocialMediaRepository>();
// builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
// builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
// builder.Services.AddScoped<IProjectTypeRepository, ProjectTypeRepository>();
// builder.Services.AddScoped<ISiteRepository, SiteRepository>();

builder.Services.AddScoped<ISiteService, SiteService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IBackgroundTaskQueue, BackgroundTaskQueue>();
builder.Services.AddScoped<IDbInitializer, DbInitializer>();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
builder.Services.AddScoped<IMediaRepository, MediaRepository>();

builder.Services.AddScoped<IUserMapper, UserMapper>();
builder.Services.AddScoped<ISiteMapper, SiteMapper>();
builder.Services.AddScoped<IMediaMapper, MediaMapper>();
builder.Services.AddScoped<IPageMapper, PageMapper>();

// builder.Services.AddScoped<IUserMapper, UserMapper>();
// builder.Services.AddScoped<IProjectMapper, ProjectMapper>();
// builder.Services.AddScoped<IProjectTypeMapper, ProjectTypeMapper>();
// builder.Services.AddScoped<IProjectMediaMapper, ProjectMediaMapper>();
// builder.Services.AddScoped<IMediaMapper, MediaMapper>();

builder.Services.AddSingleton<IAuthorizationMiddlewareResultHandler, CustomAuthorizationMiddlewareResultHandler>();
builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>().GetSection("AWS_S3");

    Console.WriteLine("=== AWS S3 CONFIG DEBUG ===");
    Console.WriteLine($"AccessKey: {config["AccessKey"]}...");
    Console.WriteLine($"BucketName: {config["BucketName"]}");
    Console.WriteLine($"Region: {config["Region"]}");
    Console.WriteLine($"ServiceURL: {config["ServiceURL"]}");
    Console.WriteLine("===========================");

    var s3Config = new AmazonS3Config
    {
        RegionEndpoint = RegionEndpoint.GetBySystemName(config["Region"]!),
        ServiceURL = config["ServiceURL"],   // ← keep this for real AWS too
        ForcePathStyle = true                // ← THIS IS REQUIRED even on real AWS when using ServiceURL
    };

    return new AmazonS3Client(
        config["AccessKey"]!,
        config["SecretKey"]!,
        s3Config
    );
});
builder.Services.AddScoped<IAmazonS3Service, AmazonS3Service>();



builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var errors = context.ModelState
            .Where(ms => ms.Value?.Errors.Count > 0)
            .SelectMany(ms => ms.Value?.Errors.Select(e => $"{ms.Key}: {e.ErrorMessage}"))
            .ToList();

        var response = new ApiResponse<object>
        {
            Success = false,
            StatusCode = 400,
            Message = "Validation failed",
            Data = null,
            Errors = errors,
            Timestamp = DateTime.UtcNow,
            TraceId = context.HttpContext.TraceIdentifier
        };

        return new BadRequestObjectResult(response);
    };
});

builder.WebHost.UseUrls(builder.Configuration["Backend:Url"] ?? throw new InvalidOperationException());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app
.UseCors("allowSpecificOrigin")
// .UseHttpsRedirection()//
.UseWebSockets()
.UseAuthentication()
.UseAuthorization();


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// app.UseMiddleware<TokenMiddleware>();
app.UseMiddleware<LoggingMiddleware>();
app.UseMiddleware<ApiResponseMiddleware>();

app.MapControllers();


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var seeder = scope.ServiceProvider.GetRequiredService<IDbInitializer>();
        await seeder.SeedAsync();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred seeding the database.");
    }
}

app.Run();
