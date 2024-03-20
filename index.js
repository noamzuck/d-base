const { error } = require('console');

const fs = require('fs').promises;

//Check if the database exists

async function create({ name, subjects, description }) {
    if(!name || !subjects) return "ERROR: There are some variables missing.";
    return await fs.stat(name + ".json")
    .then(() => { return "ERROR: The database already exists." })
    .catch(async error => {
        if(Array.isArray(subjects)) {
            if(!description) description = null;
            return await fs.writeFile(name + '.json', JSON.stringify( { description: description, subjects: subjects, rows: {} }, null, 2 ))
            .then(() => { return "The database was created successfully." })
            .catch(() => { return "ERROR: The database does not exists." });
        } else return "ERROR: There is an error with the subjects you provided.";
    });
}

async function get({ name, id, subject }) {
    if(!name) return "ERROR: There are some variables missing.";
    return await fs.readFile(name + '.json')
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
    if(!name || !data) return "ERROR: There are some variables missing.";
    return await fs.readFile(name + '.json')
    .then(res => JSON.parse(res))
    .then(async json => {
        await json.subjects.forEach(subject => {
            if(!data.hasOwnProperty(subject)) data[subject] = null;
        });
        const id = await getNewId(Object.keys(json.rows));
        json.rows[id] = data;
        return await fs.writeFile(name + ".json", JSON.stringify(json, null, 2))
        .then(() => { return "The row was added successfully."; })
        .catch(() => { return "ERROR: The database does not exists." });
    })
    .catch(() => { return "ERROR: The database does not exists." });
}

async function update({ name, id, data, subject }) {
    if(!name || !id || !data) return "ERROR: There are some variables missing.";
    return await fs.readFile(name + '.json')
    .then(res => JSON.parse(res))
    .then(async json => {
        if(!json.rows.hasOwnProperty(id)) return "ERROR: The ID does not exist in the database.";
        if(subject) {
            if(!json.subjects.includes(subject)) return "ERROR: The subject does not exist in the database.";
            json.rows[id][subject] = data;
            return await fs.writeFile(name + ".json", JSON.stringify(json, null, 2))
            .then(() => { return "The row has been updated successfully." })
            .catch(() => { return "ERROR: The database does not exists." });
        } else {
            await json.subjects.forEach(subject => {
                if(!data.hasOwnProperty(subject)) data[subject] = null;
            });
            json.rows[id] = data;
            return await fs.writeFile(name + ".json", JSON.stringify(json, null, 2))
            .then(() => { return "The row has been updated successfully." })
            .catch(() => { return "ERROR: The database does not exists." });
        }
    })
    .catch(() => { return "ERROR: The database does not exists." });
}

async function updateDatabase({ name, newName, subjects, description }) {
    if(!name) return "ERROR: There are some variables missing.";
    return await fs.readFile(name + ".json")
    .then(res => JSON.parse(res))
    .then(async json => {
        if(subjects) {
            if(Array.isArray(subjects)) {
                await Object.keys(json.rows).forEach(async row => {
                    let i = 0;
                    await Object.keys(json.rows[row]).forEach(subject => {
                        if(subject != subjects[i]) {
                            if(subjects[i] != undefined) json.rows[row][subjects[i]] = json.rows[row][subject];
                            delete json.rows[row][subject];
                        }
                        i++;
                    });
                });
                json.subjects = subjects;
            } else return "ERROR: There is an error with the subjects you provided.";
        }
        if(description) json.description = description;

        let nameStat = "", otherStat = "";
        if(newName) {
            nameStat = await fs.rename(name + ".json", newName + ".json")
            .then(() => { return "OK"})
            .catch(() => { return "ERROR: The database does not exists.1111111111" });
        }

        if(description || subjects) {
            otherStat = await fs.writeFile(name + ".json", JSON.stringify(json, null, 2))
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
  

module.exports = { create, get, set, update, updateDatabase };

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