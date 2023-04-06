const yargs = require("yargs");
const { addNote, getNotes, remove, printNotes } = require("./notes.controller");

yargs.command({
    command: "add",
    describe: "Add new note-list",
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true,
        },
    },
    handler({ title }) {
        addNote(title);
    },
});

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        printNotes();
    },
});
yargs.command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
        id: {
            type: "string",
            describe: "id note",
            demandOption: true,
        },
    },
    async handler({ id }) {
        remove(id);
    },
});

yargs.parse();
