const mongoose = require('mongoose')
const Project = require('./Project')
const config = require('./config.json')

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/princepride-project-clone")

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://" + config.url + ":3000",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {
  socket.on("get-project", async projectId => {
    const project = await findOrCreateProject(projectId)
    socket.join(projectId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(projectId).emit("receive-changes", delta)
    })

    socket.on("save-project", async data => {
      await Project.findByIdAndUpdate(projectId, { data })
    })
  })
})

async function findOrCreateProject(id) {
  if (id == null) return

  const project = await Project.findById(id)
  if (project) return project
  return await Project.create({ _id: id, data: defaultValue })
}