const express = require('express');
const path = require('path');
const app = express();

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.listen(3000, function() {
    console.log('App is listening on port 3000');
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});