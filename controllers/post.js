import knex from "knex";
import knexfile from "../knexfile.js";
import jwt from "jsonwebtoken";

const db = knex(knexfile);

export const getPosts = async (req, res) => {
    try {
        let posts = db("posts");
        if (req.query.cat) {
            posts = posts.where("cat", req.query.cat);
        }
        const data = await posts.select("*");

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const getPost = async (req, res) => {
    try {
        const data = await db("posts as p")
            .join("users as u", "u.id", "p.uid")
            .where("p.id", req.params.id)
            .select(
                "p.id",
                "username",
                "title",
                "desc",
                "p.img",
                "u.img as userImg",
                "cat",
                "date"
            )
            .first();

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const addPost = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Not authenticated!");
    }

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }

        try {
            const newPost = await db("posts").insert({
                title: req.body.title,
                desc: req.body.desc,
                img: req.body.img,
                cat: req.body.cat,
                date: req.body.date,
                uid: userInfo.id,
            });

            return res.json("Post has been created.");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    });
};

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Not authenticated!");
    }
    jwt.verify(token, "jwtkey", async (err, userInfo) => {
        //validate token  const token = jwt.sign({ id: user.id }, "jwtkey") from auth.js;
        if (err) {
            return res.status(403).json("Token is not valid!");
        }

        const postId = req.params.id;
        try {
            const post = await db("posts")
                .where({ id: postId, uid: userInfo.id })
                .first();
            if (!post) {
                return res.status(403).json("You can delete only your post!");
            }

            await db("posts").where({ id: postId, uid: userInfo.id }).delete();

            return res.json("Post has been deleted!");
        } catch (err) {
            return res.status(500).json(err);
        }
    });
};

export const updatePost = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Not authenticated!");
    }

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }

        const postId = req.params.id;

        try {
            const update = await db("posts")
                .where({ id: postId, uid: userInfo.id })
                .update({
                    title: req.body.title,
                    desc: req.body.desc,
                    img: req.body.img,
                    cat: req.body.cat,
                });

            // Depending on your DB configuration, "update" might return different values
            // If it's the number of affected rows, you might check if it's > 0 to confirm the update
            if (update) {
                return res.json("Post has been updated.");
            } else {
                return res
                    .status(404)
                    .json("Post not found or you're not the owner.");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    });
};
