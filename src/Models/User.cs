namespace Models;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public string Email { get; set; } = "";

    public string Password { get; set; } = "";

    public DateTime CreateDate { get; set; }

    public bool SoftDelete { get; set; }

    public User()
    {

    }

    public User(string name, string email, string password)
    {
        Name = name;
        Email = email;
        Password = password;
        CreateDate = DateTime.Now;
    }

    public User(int id, string name, string email, string password, DateTime createdate, bool softdelete)
    {
        Id = id;
        Name = name;
        Email = email;
        Password = password;
        CreateDate = createdate;
        SoftDelete = softdelete;
    }
}
