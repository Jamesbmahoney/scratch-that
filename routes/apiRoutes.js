const router = require('express').Router();
const fs = require('fs');

router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        noteData = JSON.parse(data);
        res.send(noteData);
    });
});


router.post('/api/notes', (req, res) => {
    const userData = req.body;
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      noteData = JSON.parse(data);
      noteData.push(userData);
      let num = 1;
      noteData.forEach((note, index) => {
        note.id = num;
        number++;
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

  router.delete('/api/notes/:id', (req, res) =>{
      const deleteData = req.params.id;
      console.log(deleteData);
      fs.readFile('./db/db.json', (err, data) =>{
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