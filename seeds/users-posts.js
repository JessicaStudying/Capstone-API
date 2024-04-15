import usersData from "./seed-data/users.js";
import postsData from "./seed-data/posts.js";

//To work with module need to use export const variable-name
export const seed = async function (knex) {
    await knex("posts").del();
    await knex("users").del();
    await knex("users").insert(usersData);
    await knex("posts").insert(postsData);
};

