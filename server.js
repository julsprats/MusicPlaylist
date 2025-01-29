const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const HTTP_PORT = process.env.PORT || 8080;

const path = require("path")

app.use(express.static("assets"));

const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

//-------------------------------------------------

const music = [
  { title: "Reminder", artist: "The Weeknd", image: "theweeknd.jpeg", id: 1 },
  { title: "Efecto", artist: "Bad Bunny", image: "badbunny.jpg", id: 2 },
  { title: "Rush", artist: "Ayra Starr", image: "ayra.jpeg", id: 3 },
  { title: "Overdrive", artist: "Drake", image: "drake.jpg", id: 4 },
];

let playlist = [];

app.get("/", (req, res) => {
  res.render("home-template", { layout: "my-layout", songs: music, playlist: playlist});
});

app.get("/playlist", (req, res) => {
  res.render("playlist-template", { layout: "my-layout", playlist: playlist})
});

//Adding a song to the playlist
app.post("/add-song/:id", (req, res) => {
  const songId = +req.params.id;
  const songAdd = music.find((song) => song.id === songId);

  if (songAdd) {
    playlist.push(songAdd);
  }

  res.redirect("/playlist");
});

//Deleting a song from the playlist
app.post("/delete-song/:id", (req, res) => {
  const songId = +req.params.id;
  const songDeleted = playlist.findIndex((song) => song.id === songId);

  if (songDeleted !== -1) {
    playlist.splice(songDeleted, 1);
  }

  res.redirect("/playlist");
});

//-------------------------------------------------
const onHttpStart = () => {
  console.log("The web server has started...");
  console.log(`Server is listening on port ${HTTP_PORT}`);
  console.log("Press CTRL+C to stop the server.");
};


app.listen(HTTP_PORT, onHttpStart);
