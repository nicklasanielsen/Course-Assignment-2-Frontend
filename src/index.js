import "./style.css"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade.js";
import { type } from "jquery";

// ADD PERSON
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
                    if(document.getElementById("error").style.display === "none"){
                        document.getElementById("error").style.display = "block";
                    }
                    err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
                } else {
                    console.log("Network error");
                }
            });
    })
}

//SØG EFTER PERSON UD FRA TELEFONNUMMER

document.getElementById("phoneForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let phoneNumber;
    phoneNumber = document.getElementById("phoneField").value;
    personFacade.getPersonByNumber(phoneNumber)
        .then(data => {
            const personRows = data.map(person => `
    <tr>
        <td>${person.id}</td>
        <td>${person.fullName}</td>
        <td>${person.email}</td>
        <td>${person.address.address}</td>
        <td>${person.address.city}</td>
        <td>${person.phones.map(phone =>
                phone.number)}</td>
        <td>${person.hobbies.map(hobby =>
                hobby.hobbyName)}</td>
        <td><a href="javascript:void(0);" name="deleteRequest" id="${person.id}">delete</a> / <a href="javascript:void(0);" name="editRequest" id="${person.id}" data-toggle="modal" data-target="#myModal">edit</a></td>
    </tr>`
            );
            const personRowsAsString = personRows.join("");
            document.getElementById("tableBody").innerHTML = personRowsAsString;
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                if(document.getElementById("error").style.display === "none"){
                    document.getElementById("error").style.display = "block";
                }
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
        <td>${person.id}</td>
        <td>${person.fullName}</td>
        <td>${person.email}</td>
        <td>${person.address.address}</td>
        <td>${person.address.city}</td>
        <td>${person.phones.map(phone =>
                phone.number)}</td>
        <td>${person.hobbies.map(hobby =>
                hobby.hobbyName)}</td>
        <td><a href="javascript:void(0);" name="deleteRequest" id="${person.id}">delete</a> / <a href="javascript:void(0);" name="editRequest" id="${person.id}" data-toggle="modal" data-target="#myModal">edit</a></td>
    </tr>`
            );
            const personRowsAsString = personRows.join("");
            document.getElementById("tableBody").innerHTML = personRowsAsString;
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                if(document.getElementById("error").style.display === "none"){
                    document.getElementById("error").style.display = "block";
                }
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
})

//FÅ ANTAL PERSONER MED SPECIFIK HOBBY

document.getElementById("hobbyNumberForm").addEventListener("submit", function (e) {
e.preventDefault();
let hobby = document.getElementById("hobbyNumberField").value;
getCount(hobby)
})

function getCount(hobby){
        personFacade.getPersonsByHobby(hobby)
            .then(data => {
                let hidden = document.getElementById("hobbyNumberResult");
                 hidden.innerHTML = `Antal af personer med denne hobby : ` + data.length;
                 if (hidden.style.display === "none") {
                 hidden.style.display = "block";
                }
            })
            .catch(err => {
                console.log(err);
                if (err.status) {
                    if(document.getElementById("error").style.display === "none"){
                        document.getElementById("error").style.display = "block";
                    }
                    err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
                } else {
                    console.log("Network error");
                }
            });
}

//SØG EFTER PERSONER UD FRA BY

document.getElementById("cityForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let city;
    city = document.getElementById("cityField").value;
    personFacade.getPersonByCity(city)
        .then(data => {
            const personRows = data.map(person => `
    <tr>
        <td>${person.id}</td>
        <td>${person.fullName}</td>
        <td>${person.email}</td>
        <td>${person.address.address}</td>
        <td>${person.address.city}</td>
        <td>${person.phones.map(phone =>
                phone.number)}</td>
        <td>${person.hobbies.map(hobby =>
                hobby.hobbyName)}</td>
        <td><a href="javascript:void(0);" name="deleteRequest" id="${person.id}">delete</a> / <a href="javascript:void(0);" name="editRequest" id="${person.id}" data-toggle="modal" data-target="#myModal">edit</a></td>
    </tr>`
            );
            const personRowsAsString = personRows.join("");
            document.getElementById("tableBody").innerHTML = personRowsAsString;
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                if(document.getElementById("error").style.display === "none"){
                    document.getElementById("error").style.display = "block";
                }
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
})

//SØG EFTER PERSONER UD FRA POSTNUMMER

document.getElementById("zipForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let zip;
    zip = document.getElementById("zipField").value;
    personFacade.getPersonByZip(zip)
        .then(data => {
            const personRows = data.map(person => `
    <tr>
        <td>${person.id}</td>
        <td>${person.fullName}</td>
        <td>${person.email}</td>
        <td>${person.address.address}</td>
        <td>${person.address.city}</td>
        <td>${person.phones.map(phone =>
                phone.number)}</td>
        <td>${person.hobbies.map(hobby =>
                hobby.hobbyName)}</td>
        <td><a href="javascript:void(0);" name="deleteRequest" id="${person.id}">delete</a> / <a href="javascript:void(0);" name="editRequest" id="${person.id}" data-toggle="modal" data-target="#myModal">edit</a></td>
    </tr>`
            );
            const personRowsAsString = personRows.join("");
            document.getElementById("tableBody").innerHTML = personRowsAsString;
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                if(document.getElementById("error").style.display === "none"){
                    document.getElementById("error").style.display = "block";
                }
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
            const cityRows = data.map(city => `
    <tr>
        <td>${city.zip}</td>
        <td>${city.city}</td>
    </tr>`
            );
            const cityRowsAsString = cityRows.join("");
            document.getElementById("tableBody2").innerHTML = cityRowsAsString;
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                if(document.getElementById("error").style.display === "none"){
                    document.getElementById("error").style.display = "block";
                }
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
})

//DELETE PERSON

function deletePerson(id){
    personFacade.deletePerson(id)
    .catch(err => {
        console.log(err);
        if (err.status) {
            if(document.getElementById("error").style.display === "none"){
                document.getElementById("error").style.display = "block";
            }
            err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        } else {
            console.log("Network error");
        }
    });
}

//EDIT PERSON

//Hiver Data
function editPerson(id) {
    document.getElementById("id").value = id;
    personFacade.getPersonById(id)
        .then(person => {
            console.log(person);
            console.log(typeof person);
            console.log(JSON.parse(JSON.stringify(person)));
            document.getElementById("fullName").value = person[0].fullName;
            document.getElementById("email").value = person[0].email;
            document.getElementById("address").value = person[0].address.address;
            document.getElementById("city").value = person[0].address.city;
            document.getElementById("phone").value = person[0].phones.map(phone => phone.number)
            document.getElementById("phoneType").value = person[0].phones.map(phone => phone.type)
            document.getElementById("hobbyName").value = person[0].hobbies.map(hobby => hobby.hobbyName)
            document.getElementById("hobbyDesc").value = person[0].hobbies.map(hobby => hobby.hobbyDescription)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                if(document.getElementById("error").style.display === "none"){
                    document.getElementById("error").style.display = "block";
                }
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
}

//Opdatere Data

function updatePerson() {
    const person = {
        "id" : document.getElementById("id").value,
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
    personFacade.editPerson(person)
        .catch(err => {
            console.log(err);
            if (err.status) {
                if(document.getElementById("error").style.display === "none"){
                    document.getElementById("error").style.display = "block";
                }
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            } else {
                console.log("Network error");
            }
        });
}

document.getElementById("savebtn").addEventListener("click", function (e) {
    let action = document.getElementById("id").value;

    if (action === "0") {
        addPerson();
    } else {
        updatePerson();
    }
})

document.getElementById("tableBody").addEventListener("click", function (e) {
    let request = e.target;
    let id = request.id;

    if (request.name === "deleteRequest") {
        deletePerson(id);
    } else if (request.name === "editRequest") {
        editPerson(id);
    }
})

document.getElementById("addPerson").addEventListener("click", function () {
    document.getElementById("id").value = "0";
})