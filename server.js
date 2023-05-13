const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.port || 3001;
const app = express();

const uuid = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Make Get Route
app.get('/api/notes', (req, res) =>{
    const notes = JSON.parse(fs.readFileSync(`./db/db.json`,'utf8'));
        res.json(notes)
})
//Make post route
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const data = fs.readFileSync('./db/db.json', 'utf8');
    const notes = JSON.parse(data);
    const newNote = {
        id: uuid.v4(),
        title,
        text
    };
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(newNote);
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);