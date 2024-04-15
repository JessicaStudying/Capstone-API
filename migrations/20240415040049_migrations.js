/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function (knex) {
    return knex.schema
        .createTable("users", (table) => {
            table.increments("id").primary();
            table.string("username", 45).notNullable();
            table.string("email", 255).notNullable();
            table.string("password", 255).notNullable();
        })

        .createTable("posts", (table) => {
            table.increments("id").primary();
            table.string("title", 255).notNullable();
            table.string("desc", 1000).notNullable();
            table.string("img", 255).notNullable();
            table.datetime("date").nullable();
            table
                .integer("uid")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
            table.string("cat", 45).nullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
