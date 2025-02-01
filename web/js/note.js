class Note {
    // TODO: Pillar notas por usuario

    addNote(userId, title, text, priority) {
        fetch("http://localhost:8080/Notes", {
            method: "POST",
            body: JSON.stringify({
                "userId": userId,
                "title": title,
                "text": text,
                "priority": priority,
            }),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    modifyNote(id, title, text, priority, isActive) {
        fetch(`http://localhost:8080/Note/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "title": title,
                "text": text,
                "priority": priority,
                "isActive": isActive,
            }),
        }).then((response) => console.log(response))
            .catch((error) => console.log(error));
    }

    // public Note(int userid, string title, string text, int priority)
    // Borrar
    // Search
}
