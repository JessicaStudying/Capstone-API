/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("users").insert([
        {
            username: "alexdoe",
            email: "alexdoe@example.com",
            password:
                "$2b$10$8QOdlmFrV464rDWdEVuHce2.XOKMg4lofdL9.2zrYNzUFFH0mmZf6",
        },
        {
            username: "bethsmith",
            email: "bethsmith@example.com",
            password:
                "$2b$10$8QOdlmFrV464rDWdEVuHce2.XOKMg4lofdL9.2zrYNzUFFH0mmZf6",
        },
        {
            username: "charliebrown",
            email: "charliebrown@example.com",
            password:
                "$2b$10$8QOdlmFrV464rDWdEVuHce2.XOKMg4lofdL9.2zrYNzUFFH0mmZf6",
        },
        {
            username: "dannyphantom",
            email: "dannyphantom@example.com",
            password:
                "$2b$10$8QOdlmFrV464rDWdEVuHce2.XOKMg4lofdL9.2zrYNzUFFH0mmZf6",
        },
        {
            username: "ellagreen",
            email: "ellagreen@example.com",
            password:
                "$2b$10$8QOdlmFrV464rDWdEVuHce2.XOKMg4lofdL9.2zrYNzUFFH0mmZf6",
        },
        {
            username: "fionagray",
            email: "fionagray@example.com",
            password:
                "$2b$10$8QOdlmFrV464rDWdEVuHce2.XOKMg4lofdL9.2zrYNzUFFH0mmZf6",
        },
        {
            username: "georgeking",
            email: "georgeking@example.com",
            password:
                "$2b$10$8QOdlmFrV464rDWdEVuHce2.XOKMg4lofdL9.2zrYNzUFFH0mmZf6",
        },
        {
            username: "hannahzoe",
            email: "hannahzoe@example.com",
            password:
                "$2b$10$8QOdlmFrV464rDWdEVuHce2.XOKMg4lofdL9.2zrYNzUFFH0mmZf6",
        },
        {
            username: "ivanhoe",
            email: "ivanhoe@example.com",
            password:
                "$2b$10$8QOdlmFrV464rDWdEVuHce2.XOKMg4lofdL9.2zrYNzUFFH0mmZf6",
        },
        {
            username: "julietshades",
            email: "julietshades@example.com",
            password:
                "$2b$10$8QOdlmFrV464rDWdEVuHce2.XOKMg4lofdL9.2zrYNzUFFH0mmZf6",
        },
    ]);
};
