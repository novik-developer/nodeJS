const express = require("express");
const chalk = require("chalk");
const {
    addNote,
    getNotes,
    remove,
    updateNote,
} = require("./notes.controller.js");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get
app.get("/", async (req, res) => {
    res.render("index", {
        title: "Welcome express",
        notes: await getNotes(),
        created: false,
    });
});

// post
app.post("/", async (req, res) => {
    await addNote(req.body.title);
    res.render("index", {
        title: "Welcome express",
        notes: await getNotes(),
        created: true,
    });
});

// delete
app.delete("/:id", async (req, res) => {
    await remove(req.params.id);
    res.render("index", {
        title: "Welcome express",
        notes: await getNotes(),
        created: false,
    });
});

// update
app.put("/:id", async (req, res) => {
    await updateNote(req.params.id, req.body);
    res.render("index", {
        title: "Welcome express",
        notes: await getNotes(),
        created: false,
    });
});

app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}`));
});
