using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] User loginRequest)
    {
        var user = UserServices.Auth(loginRequest.Email, loginRequest.Password);
        if (user == null)
        {
            // Devuelve un StatusCode 401 (Unauthorized)
            return Unauthorized();
        }
        // Devuelve un Status de Ok junto con el id como token
        return Ok(user.Id);
    }
}

