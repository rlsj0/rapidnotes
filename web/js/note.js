class Note {
    // TODO: cuando esté hecho el html, coger de ahí los campos
    
    // Nota por usuario

    // Agregar nota

    function addNote() {
        // TODO: cambiar los siguientes campos para que coja el html
        let noteTitle = "title";
        let noteText = "Some text";
        let priority = 1;
        let isActive = true;

        // TODO: post

        fetch("http://localhost:8080/Notes", {
            method: "POST",
            body: JSON.stringify({
                }),
            headers: {
                "Content-type": "application/json",
            }
        })

        return;
    }

    addNote();
    // Modificar
    // Borrar
    // Search
}
