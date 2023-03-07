const mongoose = require('mongoose')
const Project = require('./Project')
const config = require('./config.json')

const defaultValue = {
    module: "project",
    id: "root-0",
    children: [],
    "collapsed": false,
}

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/princepride-project-clone")

const io = require("socket.io")(3001, {
    cors: {
        origin: "http://" + config.url + ":3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", socket => {
    socket.on("get-project", async projectId => {
        const project = await findOrCreateProject(projectId);
        socket.join(projectId);
        socket.emit("load-project", project.data);
        socket.on("send-changes", (tree) => {
            socket.broadcast.to(projectId).emit("receive-changes", tree)
        })
    })
});

async function findOrCreateProject(id) {
    if(id == null) {
        return ;
    }
    else {
        const project = await Project.findById(id);
        if (project) {
            return project;
        }
        else {
            return await Project.create({ _id: id, data: defaultValue })
        }
    }
}