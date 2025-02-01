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
            return Unauthorized(new { message = "Incorrect user or password" });
        }
        // Devuelve un Status de Ok junto con el id en el body
        return Ok(user.Id);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] User registerRequest)
    {
        var success = UserServices.Register(registerRequest.Name, registerRequest.Email, registerRequest.Password);
        if (!success)
        {
            return BadRequest(new { message = "Email already used" });
        }
        return Ok(new { message = "User registered" });
    }
}

