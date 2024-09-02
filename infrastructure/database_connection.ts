import { Connection, createConnection } from "typeorm";
import entities from "../core/entities/db_entities";
import assert from "assert";

function assertEnvironmentVariable(
  assertion: boolean,
  variableName: string,
): asserts assertion {
  assert.strict.ok(
    assertion,
    `${variableName} environment variable is not set`,
  );
}

export default class DatabaseConnection {
  static #persistentConnection: Connection | null = null;
  public static async create() {
    if (this.#persistentConnection === null) {
      const host = process.env["DB_HOST"] ?? null;
      const username = process.env["DB_USERNAME"] ?? null;
      const password = process.env["DB_PASSWORD"] ?? null;
      const database = process.env["DB_NAME"] ?? null;

      assertEnvironmentVariable(host !== null, "DB_HOST");
      assertEnvironmentVariable(username !== null, "DB_USERNAME");
      assertEnvironmentVariable(password !== null, "DB_PASSWORD");
      assertEnvironmentVariable(database !== null, "DB_NAME");

      try {
        this.#persistentConnection = await createConnection({
          type: "mssql",
          entities,
          host,
          username,
          password,
          database,
          synchronize: true,
        });
      } catch (error) {
        console.error("Error connecting to the database", error);
        throw error;
      }
    }
    return this.#persistentConnection;
  }
}
