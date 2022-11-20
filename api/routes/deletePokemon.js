var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.delete('/deletePokemon', function (req, res) {
  const inventoryPath = path.join(__dirname, '..', 'public', 'inv.json');
  const id = req.body.id;
  const lastOne = req.body.lastOne;

  try {
    const rawFile = fs.readFileSync(inventoryPath);
    let inventory = JSON.parse(rawFile.toString());
    let newInv = {};

    let keys = Object.keys(inventory);

    if (id != null) {
      delete inventory[id];

      for (let i = 0; i < keys.length; i++) {
        newInv[i + 1] = inventory[keys[i]];
      }
    } else if (lastOne) {
      delete inventory[keys.length];
      newInv = inventory;
    }

    fs.writeFileSync(inventoryPath, JSON.stringify(newInv, null, 2));
    res.send(inventory);
  } catch (err) {
    console.log(err);
    res.send('Error.');
  }
});

module.exports = router;
