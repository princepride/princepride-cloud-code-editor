const { Schema, model } = require("mongoose")

const Project = new Schema({
  _id: String,
  data: Object,
})

module.exports = model("Project", Project)