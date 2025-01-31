namespace Repositories;

using Models;
using Microsoft.Data.Sqlite;
using System.Globalization;

public static class NoteRepository
{
    public static string DatabasePath = "rapidnotes.db";

    public static int InsertNote(Note note)
    {
        // Pasar la DateTime a ISO 8601
        string date = note.CreationDate.ToString("o", CultureInfo.InvariantCulture);

        using (var connection = new SqliteConnection("Data Source=" + DatabasePath))
        {

            connection.Open();
            var command = connection.CreateCommand();
            // No meter el id, que se genera como ROWID
            command.CommandText =
                @"INSERT INTO notes
                VALUES(NULL, $userid, $title, $text, $priority, $creationdate, $isactive)
                ";
            command.Parameters.AddWithValue("$userid", note.UserId);
            command.Parameters.AddWithValue("$title", note.Title);
            command.Parameters.AddWithValue("$text", note.Text);
            command.Parameters.AddWithValue("$priority", note.Priority);
            command.Parameters.AddWithValue("$creationdate", date);
            command.Parameters.AddWithValue("$isactive", note.IsActive);

            command.ExecuteNonQuery();

            // Retomar el Id (rowid)
            var newcommand = connection.CreateCommand();
            newcommand.CommandText = @"SELECT last_insert_rowid()";
            SqliteDataReader query = newcommand.ExecuteReader();

            var newId = 0;
            if (query.Read())
            {
                newId = query.GetInt32(0);
            }

            connection.Close();

            return newId;
        }
    }

    public static List<Note> SelectAllUserNotes(int userid)
    {
        var notelist = new List<Note>();

        using (var connection = new SqliteConnection("Data Source=" + DatabasePath))
        {
            connection.Open();

            var command = connection.CreateCommand();
            command.CommandText =
            @"SELECT * FROM notes WHERE userid = $userid;";
            command.Parameters.AddWithValue("$userid", userid);

            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    var id = reader.GetInt32(0);
                    var newuserid = reader.GetInt32(1);
                    var title = reader.GetString(2);
                    var text = reader.GetString(3);
                    var priority = reader.GetInt32(4);
                    var baddate = reader.GetString(5);
                    var badisactive = reader.GetInt32(6);

                    // Little parsing

                    var date = DateTime.Parse(baddate);

                    bool isactive = true;

                    if (badisactive == 0)
                    {
                        isactive = false;
                    }
                    else
                    {
                        isactive = true;
                    }

                    // Nuevo item y add it
                    var note = new Note(id, newuserid, title, text, priority, date, isactive);
                    notelist.Add(note);
                }
            }
        }
        return notelist;
    }

    public static void UpdateNoteTitle(Note note)
    {
        var newTitle = note.Title;
        var id = note.Id;

        using (var connection = new SqliteConnection("Data Source=" + DatabasePath))
        {
            connection.Open();
            var command = connection.CreateCommand();
            command.CommandText = @"UPDATE SET title=$title FROM notes WHERE id=$id";
            command.Parameters.AddWithValue("$title", newTitle);
            command.Parameters.AddWithValue("$id", id);
            command.ExecuteNonQuery();
        }

        return;
    }

    public static void UpdateNoteText(Note note)
    {
        var newText = note.Text;
        var id = note.Id;

        using (var connection = new SqliteConnection("Data Source=" + DatabasePath))
        {
            connection.Open();
            var command = connection.CreateCommand();
            command.CommandText = @"UPDATE SET text=$text FROM notes WHERE id=$id";
            command.Parameters.AddWithValue("$text", newText);
            command.Parameters.AddWithValue("$id", id);
            command.ExecuteNonQuery();
        }
        return;
    }

    public static void UpdateNoteIsActive(Note note)
    {
        var newStatus = note.IsActive;
        var id = note.Id;

        using (var connection = new SqliteConnection("Data Source=" + DatabasePath))
        {
            connection.Open();
            var command = connection.CreateCommand();
            command.CommandText = @"UPDATE SET isactive=$isactive FROM notes WHERE id=$id";
            command.Parameters.AddWithValue("$isactive", newStatus);
            command.Parameters.AddWithValue("$id", id);
            command.ExecuteNonQuery();
        }
        return;
    }

    public static void DeleteNoteById(int id)
    {
        using (var connection = new SqliteConnection("Data Source=" + DatabasePath))
        {
            connection.Open();
            var command = connection.CreateCommand();
            command.CommandText = @"DELETE FROM notes WHERE id=$id";
            command.Parameters.AddWithValue("$id", id);
            command.ExecuteNonQuery();
        }
        return;
    }
}

