const db = require("./index.js");

async function test() {
    let response;
    //response = await db.create({name: "alon", description: "Hello world", subjects: ["name", "age", "city"]});
    response = await db.set({name: "alon", data: {name: "roi", age: 32, city: "Jeru"}})
    //response = await db.updateDatabase({name: "alon", subjects: ["name", "age1", "place", "test"]})
    //response = await db.update({name: "alon", id: "ZcZ1FE7i73loodH3WBV9prOtjpKmqEQI", data: 19, subject: "age"})
    //response = await db.update({name: "alon", id: "ZcZ1FE7i73loodH3WBV9prOtjpKmqEQI", data: {name: "etai", age: 25, city: "Hifa"}})
    response = await db.get({name: "alon"})
    console.log(response)
}

test()