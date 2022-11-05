var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.post('/sendPokemon', function (req, res) {
  const inventoryPath = path.join(__dirname, '..', 'public', 'inv.json');

  const newPokemon = {
    ...req.body.data,
  };

  try {
    const rawFile = fs.readFileSync(inventoryPath);
    let inventory = JSON.parse(rawFile.toString());
    inventory[Object.keys(inventory).length + 1] = { ...newPokemon };
    fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 2));
    res.send(inventory);
  } catch (err) {
    console.log(err);
    res.send('Error.');
  }
});

module.exports = router;
