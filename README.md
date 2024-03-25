<h1 align="center">D-Base</h1>
<div align='center'><img src="logo.png"></div>
This package helps you manage databases in the most convenient way with the use of functions to create, delete, update, write, search and more.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install d-base.

```bash
npm install @noamzuck/d-base
```

## Usage

### A simple example of how to create a database

```javascript
//import the package as the "dbase" variable
const dbase = require('@noamzuck/d-base');

//sets the path to the folder "/d-base/"
dbase.setPath("d-base");

//creates a new database named "first" with the subjects "name", "age" and "city"
await dbase.create({ name: "first", subjects: ["name", "age", "city"], description: "example" });
```

### A more complicated example to use the whole d-base functions

```javascript
//import the package as the "dbase" variable
const dbase = require('@noamzuck/d-base');

//creates a custom function to initialize a database
async function initializeDatabase() {
    //sets the path to the folder "/d-base/" (this is the default path)
    console.log(dbase.setPath("d-base"));
    
    //checks if the database already exists
    await dbase.check({name: "first"})
    .then(async check => {
        if(!check) {
            //creates a new database named "first" with the subjects "name", "age" and "city"
            console.log(await dbase.create({ name: "first", subjects: ["name", "age", "city"], description: "example" }));
        } else {
            console.log("The database already exists.");
        }
    });

    //sets new rows in the database
    console.log(await dbase.set({name: "first", data: { name: "Joe", age: 20, city: "Philadelphia"}}));
    console.log(await dbase.set({name: "first", data: { name: "Josh", age: 25, city: "New York"}}));
    console.log(await dbase.set({name: "first", data: { name: "Dave", age: 27, city: "Los Angeles"}}));

    //gets the contents of the database named "first"
    console.log(await dbase.get({name: "first"}));

    //gets a random id of a row from the database
    const random = await dbase.getARandomRow({name: "first"});

    //gets the contents of the row from the database
    console.log(await dbase.get({name: "first", id: random}));

    //gets the contents of a specific cell
    console.log(await dbase.get({name: "first", id: random, subject: "name"}));
    
    //updates a specific cell
    console.log(await dbase.update({name: "first", id: random, data: "Mike", subject: "name" }));
    
    //updates a specific row
    console.log(await dbase.update({name: "first", id: random, data: { name: "Mike", age: 11 } }));
    
    //updates a specific database details
    console.log(await dbase.updateDatabase({name: "first", newName: "third", description: "one two three"}));

    //duplicates a specific database
    console.log(await dbase.duplicate({name: "first", newName: "second" }));

    //removes a specific database
    console.log(await dbase.remove({name: "second"}));

    //checks if the row exists
    console.log(await dbase.check({name: "third", id: random}));

    //removes the previous row
    console.log(await dbase.remove({name: "third", id: random}));
    
    //checks again if the row exists
    console.log(await dbase.check({name: "third", id: random}));

    //trying to find the string "Jo" in the database under the subject "name" 
    console.log(await dbase.find({name: "third", subject: "name", content: "Jo", exact: false}));

    //trying to find the exact string "Joe" in the database under the subject "name" 
    console.log(await dbase.find({name: "third", subject: "name", content: "Joe"}));
}

//runs the function "initializeDatabase"
initializeDatabase()
.then(() => {
    //put here your code
})
.catch(console.error);
```

## Documentation

### setPath
The function defines a new path to the directory's databases (default: /d-base/).

| Parameter | Type       | Example |
|-----------|------------|---------|
| `path`    | string | "test"  |

### create
The function creates a new database.

| Parameter       | Type                     | Example                                |
|-----------------|--------------------------|----------------------------------------|
| `name`          | string | "name"                                 |
| `subjects`      | array | ["subject", "subject"]         |
| `description`   | string  | _Optional._ "description"                          |

### set
The function sets a row in the database.

| Parameter  | Type                  | Example                                      |
|------------|-----------------------|----------------------------------------------|
| `name`     | string      | "name"                                       |
| `data`     | json | { subject: "content", subject: "content" } |

### get
The function gets a database or a specific row or cell in the database.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `id`       | string | _Optional._ "a1b2c3d4" |
| `subject`  | string | _Optional._ "subject" |

### update
The function updates a specific row or cell in the database.

| Parameter  | Type                                                | Example                                      |
|------------|-----------------------------------------------------|----------------------------------------------|
| `name`     | string                                    | "name"                                       |
| `id`       | string                               | "a1b2c3d4"                                   |
| `data`     | json / string | _Optional._ { subject: "content", subject: "content" } / "example" |
| `subject`  | string                               | _Optional._ "subject"                                    |

### updateDatabase
The function updates a database.

| Parameter    | Type                     | Example                                |
|--------------|--------------------------|----------------------------------------|
| `name`       | string | "name"                                 |
| `newName`    | string    | _Optional._ "newName"                              |
| `subjects`   | array | _Optional._ ["subject", "subject"]         |
| `description`| string  | _Optional._ "description"                          |

### remove
The function removes a specific row or an entire database.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `id`       | string | _Optional._ "a1b2c3d4" |

### check
The function checks if a specific row or database exists.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `id`       | string  | _Optional._ "a1b2c3d4" |

### find
The function finds content in the database.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `subject`  | string | "subject" |
| `content`  | allTypes      | any   |
| `exact`  | bool      | _Optional._ true   |

### duplicate
The function duplicates an existing database.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `newName`       | string  | "newName" |

### getARandomRow
The function returns an id of a random row from a database.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |

## Contributors

<p align="center">
  <img src="https://contrib.rocks/image?repo=noamzuck/d-base" />
  <img src="https://contrib.rocks/image?repo=noamzuck/d-base" />
</p>
