const { Schema, model } = require("mongoose")

const Tree = new Schema({
  _id: String,
  data: Object,
})

module.exports = model("Tree", Tree)