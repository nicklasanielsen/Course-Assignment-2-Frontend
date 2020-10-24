const URL = "http://localhost:8080/jpareststarter/api/person/"

function getPersonByNumber(phoneNumber){
    return fetch(URL + "phone/" + phoneNumber)
    .then(handleHttpErrors);
}

function getPersonsByHobby(hobby){
    return fetch(URL + "hobby/" + hobby)
    .then(handleHttpErrors);
}

function getPersonByCity(city){
    return fetch(URL + "city/" + city)
    .then(handleHttpErrors);
}

function getPersonByZip(zip){
    return fetch(URL + "zip/" + zip)
    .then(handleHttpErrors);
}

function getAllPostnumbers(){
    return fetch(URL + "city/all")
    .then(handleHttpErrors);
}

function addPerson(person){
    const options = makeOptions("POST", person);

    return fetch(URL, options)
    .then(handleHttpErrors);
}

function deletePerson(id){
    const options = makeOptions("DELETE", person)
    
    return fetch(URL + "id/" + id, options)
    .then(handleHttpErrors);
}

function editPerson(person){
    const options = makeOptions("PUT", person)
    let id = person.id;

    return fetch(URL + "id/" + id, options)
    .then(handleHttpErrors)
}

function getPersonById(id){
    return fetch(URL + "id/" + id)
    .then(handleHttpErrors);
}

const personFacade = {
    getPersonByNumber,
    getPersonsByHobby,
    getPersonByCity,
    getPersonByZip,
    getAllPostnumbers,
    addPerson,
    deletePerson,
    getPersonById,
    editPerson
}

function makeOptions(method, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default personFacade;