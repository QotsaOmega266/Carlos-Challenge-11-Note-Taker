const express = require('express');
const fs = require('fs');
const app = express();

app.get('/api/notes', function(req, res) {
    fs.readFile('db.json', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        res.json(JSON.parse(data));
    });
});

app.listen(3000, function() {
    console.log('App is listening on port 3000');
});

