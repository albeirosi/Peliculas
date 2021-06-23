﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Filtros
{
    public class ParcearBadRequests : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            var casteoResultado = context.Result as IStatusCodeActionResult;
            if (casteoResultado==null)
            {
                return;
            }


            var codigoStatus = casteoResultado.StatusCode;
            if (codigoStatus == 400)
            {
                var respuesta = new List<string>();
                var resultadoActual = context.Result as BadRequestObjectResult;
                if(resultadoActual.Value is string)
                {
                    respuesta.Add(resultadoActual.Value.ToString());
                }
                else if(resultadoActual.Value is IEnumerable<IdentityError> errores)
                {
                    foreach(var error in errores)
                    {
                        respuesta.Add(error.Description);
                    }
                }
                else
                {
                    foreach(var llave in context.ModelState.Keys)
                    {
                        foreach(var error in context.ModelState[llave].Errors)
                        {
                            respuesta.Add($"{llave}: {error.ErrorMessage}");
                        }
                    }
                }

                context.Result = new BadRequestObjectResult(respuesta);
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
           
        }
    }
}
