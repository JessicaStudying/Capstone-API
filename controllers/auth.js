import knex from "knex";
import knexfile from "../knexfile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = knex(knexfile);

export const register = async (req, res) => {
    try {
        // Check for existing user by email or username
        const existingUsers = await db("users")
            .where("email", req.body.email)
            .orWhere("username", req.body.username);

        if (existingUsers.length) {
            //checks if the existingUsers array contains any elements
            return res.status(409).json("User already exists!");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        // Insert the new user
        await db("users").insert({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        return res.status(200).json("User has been created.");
    } catch (err) {
        // Handle errors
        return res.status(500).json(err);
    }
};

export const login = async (req, res) => {
    try {
        // Check user
        const user = await db("users")
            .where("username", req.body.username)
            .first();
        //.first() method is used to retrieve only the first row from the result set of the query. When you chain .first() to a Knex query, it modifies the query so that it will return only one record (the first one found) instead of an array of records.

        if (!user) return res.status(404).json("User not found!");

        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!");

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, "jwtkey");

        // Destructure password from user details
        const { password, ...other } = user;

        // Set cookie with JWT token
        res.cookie("access_token", token, {
            httpOnly: true,
            //   the cookie should only be accessible by the web server and not by any JavaScript code running on the client side. This is a security feature that helps mitigate the risk of client-side script accessing the protected cookie data, as well as reduce the risk of cross-site scripting (XSS) attacks.
        })
            .status(200)
            .json(other);
    } catch (err) {
        // Handle errors
        return res.status(500).json(err);
    }
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .json("User has been logged out.");
};
