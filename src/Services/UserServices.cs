using Models;

namespace Services;

public static class UserServices
{
    static List<User> Users { get; }
    static int nextId = 1;
    static UserServices()
    {
        Users = new List<User>
        {

        };
    }

    public static List<User> GetAll() => Users;

    public static User? Get(int id) => Users.FirstOrDefault(p => p.Id == id);

    public static void Add(User user)
    {
        user.Id = nextId++;
        Users.Add(user);
    }

    public static void Delete(int id)
    {
        var user = Get(id);
        if (user is null)
            return;

        Users.Remove(user);
    }

    public static void Update(User user)
    {
        var index = Users.FindIndex(p => p.Id == user.Id);
        if (index == -1)
            return;

        Users[index] = user;
    }

    public static void Login()
    {
        
    }
}
