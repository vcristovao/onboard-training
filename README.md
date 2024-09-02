# onboard-training

## 2024-09-02

- Refactor project structure
- Create response and error factories
- Use one function per request for the client entities
- Use a single `tsconfig.json` file at the root of the project

### CRUD for client entity implemented

- **C**reate client entity
- **R**ead client entities
- **U**pdate client entity
- **D**elete client entity

#### Examples

![Postman showing CRUD of client entity](assets/client_crud.gif)

## Abandoned: Initial idea

```plaintext
### `core`

The idea is that `core` project holds helper functions that are going to be used by the Azure Functions implemented in the project.

The package contains a [functions](./core/functions/) folder. The proposal is for it to have functions that can simplify the process of requiring that an Azure Function needs the database connection to be created before anything happens, error handling included.

The only function implemented so far is [withDatabaseConnection](./core/functions/withDatabaseConnection.ts). Which is a higher-order function that receives a function as an argument and returns a new function that will create a database connection before calling the original function.

In case [withDatabaseConnection](./core/functions/withDatabaseConnection.ts) is not necessary, the `connect` static member of the `DatabaseConnection` class can be called directly within the function instead.

### `entities`

The entities package is responsible for holding the classes that represent the entities in the project. The idea is to have a folder for each entity that will be used in the project.

The folder name is the entity name in lowercase, and inside a `model.ts` file, the [class that represents the entity](./entities/client/model.ts) is defined using TypeORM decorators.

This package contains an `index.ts` file that exports all the entities in the package through a list.

### `functions/client`

This represents the Azure Functions that will be responsible for performing the CRUD operations on the `client` entity.

This package depends on the [core](#core) package.

## [Database connection](./database/DatabaseConnection.ts)

The `DatabaseConnection` class is responsible for creating a connection to the database. It has static properties, and it is a singleton class.

It uses ECMAScript private fields to store the connection instance in order to reuse it across the application.

The class has a `connect` method that creates the connection to the database and returns the connection instance. It uses the environment variables defined in the `local.settings.json` file to get the database connection information.

### `example.settings.json`

This file is included in the project to speed up the environment setup process, and to demonstrate the structure of the `local.settings.json` file that is required to run the project locally.

## TypeScript

Version 5 of TypeScript is being used with all the strict-checking features enabled. This did not demonstrated any problems so far.

### TypeScript Project References

The project is split into multiple packages, each with its own `tsconfig.json` file using the TypeScript Project References feature.

The `tsconfig.base.json` file in the root of the project is the main configuration file that references all the other packages.

Only minor changes are needed in the packages `tsconfig.json` file, such as the `references` field.

This allows us to have a better organization of the project and to have a better development experience with TypeScript. Performance improvements are also expected when using this feature, specially as the project grows.

No circular dependencies between the packages: It will not allow any circular dependencies between the packages, as the TypeScript compiler will throw an error if it detects one.

For more information, please refer to: [TypeScript: Documentation - Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)

### Compilation

The files are compiled directly to the same folder as the `.ts` source files. This is done to simplify the development process, as you can simply refer to the compiled JavaScript file with `"scriptFile": "./index.js"` instead of `"scriptFile": "../../../dist/a/b/index.js"` in the `function.json` file.

When using [TypeScript Project References](#typescript-project-references), the target package (e.g. `functions/client`, `entities`, `core`, etc.) must be compiled with the `-b <path to package>` command-line argument.

All the dependencies of the package given to this argument will be automatically resolved by the TypeScript compiler, as long as they are present in the `references` array.
```
