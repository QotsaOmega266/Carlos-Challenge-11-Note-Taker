const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;

    fs.readFile("notes.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read notes file" });
        }

        let notes = JSON.parse(data);
        const updatedNotes = notes.filter((note) => note.id !== noteId);

        fs.writeFile("notes.json", JSON.stringify(updatedNotes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Failed to delete note" });
            }

            res.json({ message: "Note deleted successfully" });
        });
    });
});

app.post("/api/notes", (req, res) => {
    const note = req.body;
    const noteId = generateUniqueId();
    note.id = noteId;

    fs.readFile("notes.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read notes file" });
        }

        let notes = JSON.parse(data);
        notes.push(note);

        fs.writeFile("notes.json", JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Failed to save note" });
            }

            res.json(note);
        });
    });
});

function generateUniqueId() {
    return Math.floor(Math.random() * 1000000);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


