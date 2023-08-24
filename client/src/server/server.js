const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const uuidv4 = require("uuid")
const { validPostVideo, validPatchVideo } = require('./validation')
const port = 3001
const poolDB = require("./db")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// req is in this case a fetch from getVideoList, our res is filtered video objects
app.get('/api/videos', (req, res) => {
  console.log('get', req.query.filterCriteria)
  let criteria = req.query.filterCriteria === undefined || req.query.filterCriteria === "" ? ".*" : req.query.filterCriteria
  poolDB.query("Select video.id, video.name, video.link, genre.genre, language.language from video, genre, language WHERE video.genre_id = genre.id and video.language_id = language.id and (video.name REGEXP ? or genre.genre REGEXP ?)", [criteria, criteria],
    function (error, result, fields) {
      if (error) throw error;
      res.json(result);
    })
})

app.get('/api/genre', (req, res) => {
  poolDB.query("Select genre.genre, genre.id from genre", [],
    function (error, result, fields) {
      if (error) throw error;
      res.json(result);
    })
})

app.get('/api/language', (req, res) => {
  poolDB.query("Select language.language, language.id from language", [],
    function (error, result, fields) {
      if (error) throw error;
      res.json(result);
    })
})

// In this case, req is an object with all the properties set in UploadVideo.js and function which is calling all the setters 
// see newVideo() in UploadVideo.js
app.post('/api/videos', (req, res) => {
  console.log('post');
  if (!validPostVideo(req)) {
    res.status(400).send({ message: "Only name, genre, link, language must be defined" })
    return
  }
 
  let r = req.body
  poolDB.query("INSERT INTO video( name, link, genre_id, language_id) VALUES (?,?,?,?)", [r.name, r.link, r.genre, r.language],
  function (error, result, fields) {
    if (error) throw error;
    res.json({});
  })

})

// removeVideo() from Video.js is called
app.delete('/api/videos', (req, res) => {
  console.log('delete', req.body.id);
  const id = req.body.id
  poolDB.query("Delete from video WHERE video.id = ?", [id],
  function (error, result, fields) {
    if (error) throw error;
    res.json({});
  })
})
/* 
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
}) */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})