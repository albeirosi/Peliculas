using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace PeliculasAPI.Filtros
{
    public class FiltroDeException : ExceptionFilterAttribute
    {
        private readonly ILogger<FiltroDeException> logger;

        public FiltroDeException(ILogger<FiltroDeException>logger)
        {
            this.logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            logger.LogError(context.Exception, context.Exception.Message);
            base.OnException(context);
        }
    }
}
