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

function addPerson() {
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
                    "phone": document.getElementById("phone").value,
                    "phoneType": document.getElementById("phoneType").value
                }
            ],
            "hobbies": [
                {
                    "hobbyName": document.getElementById("hobbyName"),
                    "hobbyDescription": document.getElementById("hobbyDesc")
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
}

document.getElementById("addPerson").addEventListener("click", function () {
    addPerson();
})



