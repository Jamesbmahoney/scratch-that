const router = require('express').Router();
const fs = require('fs');

router.get('/api/notes', function(req, res) {       
    res.json(data);
});

router.get('/api/notes/:id', function(req, res) {
    res.json(data[Number(req.params.id)]);
});

router.get('/animals/:id', (req, res) => {
    let newNote = req.body;
    let uniqueId = (data.length).toString();
    console.log(uniqueId);
    newNote.id = uniqueId;
    data.push(newNote);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
        if (err) throw (err);        
    }); 

    res.json(data); 
  });


module.exports = router;