namespace src.Models;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }
    public DateTime CreateDate { get; set; }

    public User(string name, string email, string password)
    {
        Name = name;
        Email = email;
        this.Password = password;
        this.CreateDate = DateTime.Now;
    }
}