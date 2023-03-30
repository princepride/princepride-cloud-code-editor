const mongoose = require('mongoose')
const express = require('express');

mongoose.connect("mongodb://localhost/princepride-tree-clone")
const app = express();
app.use(express.json());

const treeSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    tree: { type: Object, required: true },
  });
  
const TreeModel = mongoose.model('TreeModel', treeSchema);

app.post('/update', async (req, res) => {
    try {
      const { _id, tree } = req.body;
      const myData = new MyModel({ _id, tree });
      await myData.save();
      res.status(200).send('Data saved successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

