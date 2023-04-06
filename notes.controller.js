const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notePath = path.join(__dirname, "db.json");

async function printNotes() {
    const notes = await getNotes();

    if (notes.length) {
        console.log(chalk.blue("Here is the list of notes:"));
        for (i = 0; i < notes.length; i++) {
            console.log(chalk.blueBright(`${notes[i].id} ${notes[i].title}`));
        }
    } else {
        console.log(chalk.blue("There are no notes in the list."));
    }
}

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString(),
    };
    notes.push(note);
    await fs.writeFile(notePath, JSON.stringify(notes));
}

async function remove(id) {
    const notes = await getNotes();
    if (notes.find((note) => note.id === id)) {
        const filtered = notes.filter((note) => note.id !== id);
        await fs.writeFile(notePath, JSON.stringify(filtered));
        console.log(chalk.red("Note deleted."));
    } else {
        console.log(chalk.red(`Note ID: ${id} no found.`));
    }
}

async function getNotes() {
    const notes = await fs.readFile(notePath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

module.exports = {
    addNote,
    getNotes,
    remove,
    printNotes,
};
