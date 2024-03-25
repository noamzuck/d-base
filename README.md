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

### get
The function gets a database or a specific row or cell in the database.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `id`       | string | _Optional._ "a1b2c3d4" |
| `subject`  | string | _Optional._ "subject" |

### set
The function sets a row in the database.

| Parameter  | Type                  | Example                                      |
|------------|-----------------------|----------------------------------------------|
| `name`     | string      | "name"                                       |
| `data`     | json | { subject: "content", subject: "content" } |

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

### delete
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

## Contributors

<p align="center">
  <img src="https://contrib.rocks/image?repo=noamzuck/d-base" />
  <img src="https://contrib.rocks/image?repo=noamzuck/d-base" />
</p>
