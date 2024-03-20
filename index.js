const fs = require('fs').promises;
let path = "d-base/";

async function create({ name, subjects, description }) {
    if(!name || !subjects) return "ERROR: There are some missing variables.";
    return await fs.stat(path + name + ".json")
    .then(() => { return "ERROR: The database already exists." })
    .catch(async error => {
        if(Array.isArray(subjects)) {
            if(!description) description = null;
            return await fs.writeFile(path + name + '.json', JSON.stringify( { description: description, subjects: subjects, rows: {} }, null, 2 ))
            .then(() => { return "The database was created successfully." })
            .catch(() => { return "ERROR: The database does not exists." });
        } else return "ERROR: There is an error with the subjects you provided.";
    });
}

async function get({ name, id, subject }) {
    if(!name) return "ERROR: There is a missing variable.";
    return await fs.readFile(path + name + '.json')
    .then(res => JSON.parse(res))
    .then(json => {
        if(id) {
            if(!json.rows.hasOwnProperty(id)) return "ERROR: The ID does not exist in the database.";
            if(subject) {
                if(!json.subjects.includes(subject)) return "ERROR: The subject does not exist in the database.";
                return json.rows[id][subject];
            } else return json.rows[id];
        } else return json.rows;
    })
    .catch(() => { return "ERROR: The database does not exists." });
}

async function set({ name, data }) {
    if(!name || !data) return "ERROR: There are some missing variables.";
    return await fs.readFile(path + name + '.json')
    .then(res => JSON.parse(res))
    .then(async json => {
        await json.subjects.forEach(subject => {
            if(!data.hasOwnProperty(subject)) data[subject] = null;
        });
        const id = await getNewId(Object.keys(json.rows));
        json.rows[id] = data;
        return await fs.writeFile(path + name + ".json", JSON.stringify(json, null, 2))
        .then(() => { return "The row was added successfully."; })
        .catch(() => { return "ERROR: The database does not exists." });
    })
    .catch(() => { return "ERROR: The database does not exists." });
}

async function update({ name, id, data, subject }) {
    if(!name || !id || !data) return "ERROR: There are some missing variables.";
    return await fs.readFile(path + name + '.json')
    .then(res => JSON.parse(res))
    .then(async json => {
        if(!json.rows.hasOwnProperty(id)) return "ERROR: The ID does not exist in the database.";
        if(subject) {
            if(!json.subjects.includes(subject)) return "ERROR: The subject does not exist in the database.";
            json.rows[id][subject] = data;
            return await fs.writeFile(path + name + ".json", JSON.stringify(json, null, 2))
            .then(() => { return "The row has been updated successfully." })
            .catch(() => { return "ERROR: The database does not exists." });
        } else {
            await json.subjects.forEach(subject => {
                if(!data.hasOwnProperty(subject)) data[subject] = null;
            });
            json.rows[id] = data;
            return await fs.writeFile(path + name + ".json", JSON.stringify(json, null, 2))
            .then(() => { return "The row has been updated successfully." })
            .catch(() => { return "ERROR: The database does not exists." });
        }
    })
    .catch(() => { return "ERROR: The database does not exists." });
}

async function updateDatabase({ name, newName, subjects, description }) {
    if(!name) return "ERROR: There is a missing variable.";
    return await fs.readFile(path + name + ".json")
    .then(res => JSON.parse(res))
    .then(async json => {
        if(subjects) {
            if(Array.isArray(subjects)) {
                await Object.keys(json.rows).forEach(async row => {
                    await Object.keys(json.rows[row]).forEach((subject, i) => {
                        if(subject != subjects[i]) {
                            if(subjects[i] != undefined) json.rows[row][subjects[i]] = json.rows[row][subject];
                            delete json.rows[row][subject];
                        }
                    });
                    if(Object.keys(json.rows[row]).length < subjects.length) {
                        await subjects.forEach((sub, index) => {
                            if(index > Object.keys(json.rows[row]).length - 1) json.rows[row][sub] = null;
                        });
                    }
                });
                json.subjects = subjects;
            } else return "ERROR: There is an error with the subjects you provided.";
        }
        if(description) json.description = description;

        let nameStat = "", otherStat = "";
        if(newName) {
            nameStat = await fs.rename(path + name + ".json", newName + ".json")
            .then(() => { return "OK"})
            .catch(() => { return "ERROR: The database does not exists.1111111111" });
        }

        if(description || subjects) {
            otherStat = await fs.writeFile(path + name + ".json", JSON.stringify(json, null, 2))
            .then(() => { return "OK" })
            .catch(() => { return "ERROR: The database does not exists.2222222222" });
        }

        if(!nameStat.includes("ERROR: ") && !otherStat.includes("ERROR: ")) return "The database successfully updated.";
        else if(nameStat.includes("ERROR: ") && otherStat.includes("ERROR: ")) return nameStat + " + " + otherStat;
        else if(nameStat.includes("ERROR: ")) return nameStat;
        else if(otherStat.includes("ERROR: ")) return otherStat;
    })
    .catch(() => { return "ERROR: The database does not exists." });
}


async function remove({ name, id }) {
    if(!name) return "ERROR: There is a missing variable.";
    if(id) {
        return await fs.readFile(path + name + '.json')
        .then(res => JSON.parse(res))
        .then(async json => {
            if(!json.rows.hasOwnProperty(id)) return "ERROR: The ID does not exist in the database.";
            delete json.rows[id];
            return await fs.writeFile(path + name + ".json", JSON.stringify(json, null, 2))
            .then(() => { return "The row has been deleted successfully." })
            .catch(() => { return "ERROR: The database does not exists." });
        })
        .catch(() => { return "ERROR: The database does not exists." });
    } else {
        try {
            await fs.unlink(path + name + '.json');
            return "The database has been deleted successfully.";
        } catch(err) {
            return "ERROR: The database does not exists.";
        }
    }
}


async function check({ name, id }) {
    if(!name) return "ERROR: There is a missing variable.";
    if(id) {
        return await fs.readFile(path + name + '.json')
        .then(res => JSON.parse(res))
        .then(async json => {
            return json.rows.hasOwnProperty(id);
        })
        .catch(() => { return "ERROR: The database does not exists." });
    } else {
        return await fs.readFile(path + name + '.json')
        .then(() => { return true })
        .catch(() => { return false });
    }
}

async function find({ name, subject, content }) {
    if(!name || !subject, !content) "ERROR: There are some missing variables.";
    return await fs.readFile(path + name + '.json')
    .then(res => JSON.parse(res))
    .then(res => res.rows)
    .then(async json => {
        const response = [];
        for(let id in json) {
            if(json[id][subject] == content) response.push(id);
        }
        if(response.length == 0) return "There are no results for your request.";
        return response;
    })
    .catch(() => { return "ERROR: The database does not exists. " });
}

function setPath(getPath) { path = getPath + "/" }

module.exports = { create, get, set, update, updateDatabase, remove, check, find, setPath };

function getNewId(ids) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }

    if(ids.includes(id)) return getNewId(ids);
    return id;
}