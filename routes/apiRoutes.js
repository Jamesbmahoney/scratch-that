const router = require('express').Router();
const fs = require('fs');


// route to get /notes
router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    noteData = JSON.parse(data);
    res.send(noteData);
  });
});

// route to add a new file, saving it to file db.json with a unique ID
router.post('/notes', (req, res) => {
  const userData = req.body;
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    noteData = JSON.parse(data);
    noteData.push(userData);
    let num = 1;
    noteData.forEach((note, index) => {
      note.id = num;
      num++;
      return noteData;
    });
    console.log(noteData);

    stringData = JSON.stringify(noteData);
    fs.writeFile('./db/db.json', stringData, (err, data) => {
      if (err) throw err;
    });
  });
  res.send('Note Saved!');
});

//allows for deletion of a note, using it's unique ID
router.delete('/notes/:id', (req, res) => {
  const deleteData = req.params.id;
  console.log(deleteData);
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    noteData = JSON.parse(data);
    for (let i = 0; i < noteData.length; i++) {
      if (noteData[i].id === Number(deleteData)) {
        noteData.splice([i], 1);
      }
    }
    console.log(noteData);
    stringData = JSON.stringify(noteData);
    fs.writeFile('./db/db.json', stringData, (err, data) => {
      if (err) throw err;
    });
  });
  res.status(204).send()
});

module.exports = router;