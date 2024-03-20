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
| `description`   | string  | "description"                          |

### get
Gets a database or a row in the database.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `id`       | string | "a1b2c3d4" |
| `subject`  | string | "subject" |

### set
Sets a row in the database.

| Parameter  | Type                  | Example                                      |
|------------|-----------------------|----------------------------------------------|
| `name`     | string      | "name"                                       |
| `data`     | json | { subject: "content", subject: "content" } |

### update
Updates a row in the database.

| Parameter  | Type                                                | Example                                      |
|------------|-----------------------------------------------------|----------------------------------------------|
| `name`     | string                                    | "name"                                       |
| `id`       | string                               | "a1b2c3d4"                                   |
| `data`     | allTypes | { subject: "content", subject: "content" } |
| `subject`  | string                               | "subject"                                    |

### updateDatabase
Updates a database.

| Parameter    | Type                     | Example                                |
|--------------|--------------------------|----------------------------------------|
| `name`       | string | "name"                                 |
| `newName`    | string    | "newName"                              |
| `subjects`   | array | ["subject", "subject"]         |
| `description`| string  | "description"                          |

### delete
Removes a row in the database or the database itself.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `id`       | string | "a1b2c3d4" |

### check
Checks if a row in the database or the database exists.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `id`       | string  | "a1b2c3d4" |

### find
Finds a subject in the database.

| Parameter  | Type          | Example     |
|------------|---------------|-------------|
| `name`     | string | "name"   |
| `subject`  | string | "subject" |
| `content`  | allTypes      | any   |
