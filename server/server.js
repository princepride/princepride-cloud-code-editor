const mongoose = require('mongoose')
const Project = require('./Project')
const config = require('./config.json')


// should implete these action: 
// rename(id, newname), delete(id, ""), 
// edit code(id, newCodes), addItem((folder, file), newname),
// upload new project(id, newProject)
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/princepride-project-clone")

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://" + config.url + ":3000",
    methods: ["GET", "POST"],
  },
})

const defaultValue = {
    module: "project",
    id: "root-0",
    children: [],
    "collapsed": false,
}

io.on("connection", socket => {
  socket.on("get-project", async projectId => {
    const project = await findOrCreateProject(projectId)
    socket.join(projectId)
    socket.emit("load-project", project.data)

    socket.on("send-changes", (tree) => {
      socket.broadcast.to(projectId).emit("receive-changes", tree)
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

//socket.on("send-changes", (action, id, newItem) => {
//  socket.broadcast.to(projectId).emit("receive-changes", action, id, newItem)
//})