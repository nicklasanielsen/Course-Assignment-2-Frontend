const URL = "localhost:8080/jpareststarter/api/person/"

function getAllPersons(){
    return fetch(URL + "all")
    .then(handleHttpErrors);
}

function getPerson(id){
    return fetch(URL + "id/" + id)
    .then(handleHttpErrors);
}

function addPerson(person){
    const options = makeOptions("POST", person);

    return fetch(url, options)
    .then(handleHttpErrors);
}

const personFacade = {
    getAllPersons,
    getPerson,
    addPerson
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