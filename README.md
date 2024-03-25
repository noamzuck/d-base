<h1 align="center">D-Base</h1>
<div align='center'><img src="logo.png"></div>
This package helps you manage databases in the most convenient way with the use of functions to create, delete, update, write, search and more.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install d-base.

```bash
npm install @noamzuck/d-base
```

## Usage

```javascript
//import the package as the "dbase" variable
const dbase = require('@noamzuck/d-base');

//sets the path to the folder "/d-base/"
dbase.setPath("d-base");

//creates a new database named "first" with the subjects "name", "age" and "city"
dbase.create({ name: "first", subjects: ["name", "age", "city"], description: "example" });
```

## Documentation

### setPath
Sets a new path for the databases.

| Parameter | Type       | Example |
|-----------|------------|---------|
| `path`    | string | "test"  |

### create
Creates a new database.

| Parameter       | Type                     | Example                                |
|-----------------|--------------------------|----------------------------------------|
| `name`          | string | "name"                                 |
| `subjects`      | array | ["subject", "subject"]         |
| `description`   | string  | _Optional._ "description"                          |

### get
Gets a database or a row or a specific cell in the database.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `id`       | string | _Optional._ "a1b2c3d4" |
| `subject`  | string | _Optional._ "subject" |

### set
Sets a row in the database.

| Parameter  | Type                  | Example                                      |
|------------|-----------------------|----------------------------------------------|
| `name`     | string      | "name"                                       |
| `data`     | json | { subject: "content", subject: "content" } |

### update
Updates a row or a specific cell in the database.

| Parameter  | Type                                                | Example                                      |
|------------|-----------------------------------------------------|----------------------------------------------|
| `name`     | string                                    | "name"                                       |
| `id`       | string                               | "a1b2c3d4"                                   |
| `data`     | json / string | _Optional._ { subject: "content", subject: "content" } / "example" |
| `subject`  | string                               | _Optional._ "subject"                                    |

### updateDatabase
Updates a database.

| Parameter    | Type                     | Example                                |
|--------------|--------------------------|----------------------------------------|
| `name`       | string | "name"                                 |
| `newName`    | string    | _Optional._ "newName"                              |
| `subjects`   | array | _Optional._ ["subject", "subject"]         |
| `description`| string  | _Optional._ "description"                          |

### delete
Removes a row in the database or the database itself.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `id`       | string | _Optional._ "a1b2c3d4" |

### check
Checks if a row in the database or the database exists.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `id`       | string  | _Optional._ "a1b2c3d4" |

### find
Finds a subject in the database.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `subject`  | string | "subject" |
| `content`  | allTypes      | any   |
| `exact`  | bool      | _Optional._ true   |

## Contributors

<p align="center">
  <img src="https://contrib.rocks/image?repo=noamzuck/d-base" />
  <img src="https://contrib.rocks/image?repo=noamzuck/d-base" />
</p>
