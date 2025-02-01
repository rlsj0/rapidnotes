class User {

    async getUserById(id) {
        return await fetch(`http://localhost:8080/User/${id}`)
            .then(respuesta => respuesta.json)
            .then(datos => { return (datos) })
            .catch(error => console.log(error))
    }

    addNewUser(id, name, email, password, createDate, softDelete) {
        fetch(`http://localhost:8080/User`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "name": name,
                "email": email,
                "password": password,
                "createDate": createDate,
                "softDelete": softDelete
            })
        })
            .then(respuesta => respuesta.json())
            .then(datos => console.log(datos))
    }

    modifyUser(id, name, email, password, createDate, softDelete) {
        console.log(id);
        fetch(`http://localhost:8080/User/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "name": name,
                "email": email,
                "password": password,
                "createDate": createDate,
                "softDelete": softDelete
            })
        }).then(respuesta => console.log(respuesta))
            .catch(error => console.log(error))
    }

    deleteUser(id) {
        fetch(`http://localhost:8080/User/${id}`, {
            method: 'DELETE',
        }).catch(error => console.log(error))
    }
}