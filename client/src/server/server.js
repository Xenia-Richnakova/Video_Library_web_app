const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const uuidv4 = require("uuid")
const { validPostVideo, validPatchVideo } = require('./validation')
const port = 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const defaultDb = {
  "videosList": []
}
function readDB() {
  let path = "./server_data/DB_videos.json"
  if (!fs.existsSync(path)) {
    fs.mkdirSync("./server_data/")
    fs.writeFileSync(path, JSON.stringify(defaultDb))
  }
  return JSON.parse(fs.readFileSync(path))
}

function saveDB(ObjectDB) {
  let path = "./server_data/DB_videos.json"
  if (!fs.existsSync(path)) {
    fs.mkdirSync("./server_data/")
  }
  fs.writeFileSync(path, JSON.stringify(ObjectDB, null, 2))
}

// here videos from DB_videos.json are loaded
let videos = readDB()

// req is in this case a fetch from getVideoList, our res is filtered video objects
app.get('/api/videos', (req, res) => {

  console.log('get', req.query.filterCriteria)
  let criteria = req.query.filterCriteria === undefined || req.query.filterCriteria === "" ? ".*" : req.query.filterCriteria
  res.send(videos.videosList.filter((video) =>
    video.name.match(criteria) != null || video.genre.match(criteria) != null)
  )
})

// In this case, req is an object with all the properties set in UploadVideo.js and function which is calling all the setters 
// see newVideo() in UploadVideo.js
app.post('/api/videos', (req, res) => {
  console.log('post');
  if (!validPostVideo(req)) {
    res.status(400).send({ message: "Only name, genre, link, language must be defined" })
    return
  }
  // into VideosList I am pushing body of the req object and id
  videos.videosList.push({ ...req.body, id: uuidv4.v4() })
  // and by this function I am rewritting the DB_video.json 
  saveDB(videos)
  // and the rewrited .json server is sending back to client
  res.send(videos.videosList)
})

// removeVideo() from Video.js is called
app.delete('/api/videos', (req, res) => {
  console.log('delete');
  // server get id in body from req and comparing it with all other IDs of videoList´s videos
  const newVideoList = videos.videosList.filter((video) => video.id !== req.body.id)
  // server rewrites videoList only with the videos whoch we want to keep
  videos.videosList = newVideoList
  saveDB(videos)
  res.send(videos.videosList)
})

app.patch('/api/videos', (req, res) => {
  console.log('update');
  if (!validPatchVideo(req)) {
    res.status(400).send({ message: "Only name, genre, link, language, id must be defined" })
    return
  }
  const id = req.body.id
  let wasUpdated = false
  for (let i = 0; i < videos.videosList.length; i++) {
    if (id === videos.videosList[i].id) {
      videos.videosList[i] = { ...videos.videosList[i], ...req.body }
      wasUpdated = true
      break
    }
  }

  if (!wasUpdated) {
    res.status(400).send({ message: "ID was not found" })
    return
  }
  saveDB(videos)
  res.send(videos.videosList)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})