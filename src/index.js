import "./style.css"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade.js";

function fetchPersons() {
    personFacade.getAllPersons()
        .then(data => {
            const persons = data.all;
            const personRows = persons.map(person => `
        <tr>
            <td>${person.fullName}</td>
            <td>${person.email}</td>
            <td>${person.address.address}</td>
            <td>${person.address.city}</td>
            <td>${person.phones.phoneNumber}</td>
            <td>${person.hobbies.hobbyName}</td>
        </tr>`
            );
            const personRowsAsString = personRows.join("");
            document.getElementById("tableBody").innerHTML = personRowsAsString;
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
}

// ADD PERSON

document.getElementById("savebtn").addEventListener("click", function () {
    let person = {
        "fullName": document.getElementById("fullName").value,
        "email": document.getElementById("email").value,
        "address": {
            "address": document.getElementById("address").value,
            "city": document.getElementById("city").value
        },
        "phones": [
            {
                "number": document.getElementById("phone").value,
                "type": document.getElementById("phoneType").value
            }
        ],
        "hobbies": [
            {
                "hobbyName": document.getElementById("hobbyName").value,
                "hobbyDescription": document.getElementById("hobbyDesc").value
            }
        ]
    }
    personFacade.addPerson(person)
        .catch(err => {
            console.log(err);
            if (err.status) {
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
})

//DELETE PERSON

document.getElementById("deleteForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let phoneNumber;
    phoneNumber = document.getElementById("deleteField").value;
    personFacade.deletePerson(phoneNumber)
    .catch(err => {
        console.log(err);
        if (err.status) {
            err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        } else {
            console.log("Network error");
        }
    });
})

//EDIT PERSON

document.getElementById("editPerson").addEventListener("click", function () {
    let id;
    id = document.getElementById("idField").value

    personFacade.getPersonById(id)
    .then(person => {
        document.getElementById("fullName2").value = person.fullName,
        document.getElementById("email2").value = person.email,
        document.getElementById("address2").value = person.address.address,
        document.getElementById("city2").value = person.address.city
        document.getElementById("phone2").value = person.phones.map(phone => phone.number)    
        document.getElementById("phoneType2").value = person.phones.map(phone => phone.type)    
        document.getElementById("hobbyName2").value = person.hobbies.map(hobby => hobby.hobbyName)    
        document.getElementById("hobbyDesc2").value = person.hobbies.map(hobby => hobby.hobbyDescription)    
    })
    .catch(err => {
        console.log(err);
        if (err.status) {
            err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        } else {
            console.log("Network error");
        }
    });

})

document.getElementById("savebtn2").addEventListener("click", function (e) {
    e.preventDefault();
    let person2 = {
        "fullName": document.getElementById("fullName").value,
        "email": document.getElementById("email").value,
        "address": {
            "address": document.getElementById("address").value,
            "city": document.getElementById("city").value
        },
        "phones": [
            {
                "number": document.getElementById("phone").value,
                "type": document.getElementById("phoneType").value
            }
        ],
        "hobbies": [
            {
                "hobbyName": document.getElementById("hobbyName").value,
                "hobbyDescription": document.getElementById("hobbyDesc").value
            }
        ]
    }

    personFacade.editPerson(person2)
    .catch(err => {
        console.log(err);
        if (err.status) {
            err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        } else {
            console.log("Network error");
        }
    });
})
//SØG EFTER PERSON UD FRA TELEFONNUMMER

document.getElementById("phoneForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let phoneNumber;
    phoneNumber = document.getElementById("phoneField").value;
    personFacade.getPersonByNumber(phoneNumber)
        .then(data => {
            const personRows = data.map(person => `
    <tr>
        <td>${person.fullName}</td>
        <td>${person.email}</td>
        <td>${person.address.address}</td>
        <td>${person.address.city}</td>
        <td>${person.phones.map(phone =>
                phone.number)}</td>
        <td>${person.hobbies.map(hobby =>
            hobby.hobbyName)}</td>
    </tr>`
            );
            const personRowsAsString = personRows.join("");
            document.getElementById("tableBody").innerHTML = personRowsAsString;
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
})

//SØG EFTER PERSONER UD FRA HOBBY
document.getElementById("hobbyForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let hobby;
    hobby = document.getElementById("hobbyField").value;
    personFacade.getPersonsByHobby(hobby)
        .then(data => {
            const personRows = data.map(person => `
    <tr>
        <td>${person.fullName}</td>
        <td>${person.email}</td>
        <td>${person.address.address}</td>
        <td>${person.address.city}</td>
        <td>${person.phones.phoneNumber}</td>
        <td>${person.hobbies.hobbyName}</td>
    </tr>`
            );
            const personRowsAsString = personRows.join("");
            document.getElementById("tableBody").innerHTML = personRowsAsString;
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
})

//SØG EFTER PERSONER UD FRA BY

document.getElementById("cityForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let city;
    city = document.getElementById("cityField").value;
    personFacade.getPersonByCity(city)
        .then(data => {
            const personRows = data.map(person => `
    <tr>
        <td>${person.fullName}</td>
        <td>${person.email}</td>
        <td>${person.address.address}</td>
        <td>${person.address.city}</td>
        <td>${person.phones.phoneNumber}</td>
        <td>${person.hobbies.hobbyName}</td>
    </tr>`
            );
            const personRowsAsString = personRows.join("");
            document.getElementById("tableBody").innerHTML = personRowsAsString;
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
})

    //FÅ ALLE POSTNUMRE

document.getElementById("postNumberButton").addEventListener("click", function (e) {
    e.preventDefault();
    personFacade.getAllPostnumbers()
        .then(data => {
            const personRows = data.map(person => `
    <tr>
        <td>${person.address.city.zip}</td>
        <td>${person.address.city.cityName}</td>
    </tr>`
            );
            const personRowsAsString = personRows.join("");
            document.getElementById("tableBody").innerHTML = personRowsAsString;
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
})

    //FÅ ANTAL PERSONER MED SPECIFIK HOBBY

document.getElementById("hobbyPersonsForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let hobby;
    hobby = document.getElementsByName("hobbyPersonField").value;
    let hidden = document.getElementById("hobbyPersonResult");
    if (hidden.style.display === "none") {
        hidden.style.display = "block";
      }
    personFacade.getNumberOfHobbyPersons(hobby)
    .catch(err => {
        console.log(err);
        if (err.status) {
            err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        } else {
            console.log("Network error");
        }
    });
})