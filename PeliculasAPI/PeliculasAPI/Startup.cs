using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using PeliculasAPI.ApiBehavior;
using PeliculasAPI.Filtros;
using PeliculasAPI.Utilidades;
using PeliculasAPI.Validaciones;

namespace PeliculasAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AplicationsDbContext>(op =>
            {
                op.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), 
                    sqlServer => sqlServer.UseNetTopologySuite());
            });


            //services.AddTransient<MyActionFilters>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

            //services.AddTransient<IRepositorioEnMemoria, RepositorioEnMemoria>();
            services.AddAutoMapper(typeof(Startup));

            services.AddSingleton(provider =>
            new MapperConfiguration(config =>
           {
               var geometryFactory = provider.GetRequiredService<GeometryFactory>();
               config.AddProfile(new AutoMapperProfiles(geometryFactory));
           }).CreateMapper());

            services.AddSingleton<GeometryFactory>(NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326));

            services.AddTransient<IAlmacenadorArchivos, AlmacenamientoArchivoLocal>();
            services.AddHttpContextAccessor();

            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(FiltroDeException));
                options.Filters.Add(typeof(ParcearBadRequests));
            }).ConfigureApiBehaviorOptions(BehaviorBadRequests.Parsear);


            services.AddCors(options =>
            {
                var frontendURL = Configuration.GetValue<string>("frontend_url");
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader()
                    .WithExposedHeaders(new string[] { "cantidadtotalregistro" });
                });

            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PeliculasAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PeliculasAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
