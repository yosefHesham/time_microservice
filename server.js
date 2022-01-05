// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", async (req, res) => {
  if (req.params.date === undefined) {
    res.json({
      unix: Date.parse(new Date.now().toUTCString()),
      utc: new Date.now().toUTCString(),
    });
  }

  if (isNaN(parseInt(req.params.date))) {
    if (new Date(unix).toUTCString().includes("Invalid")) {
      return res.json({ error: "Invalid date" });
    }
    res.json({
      unix: new Date(unix).getMilliseconds(),
      utc: new Date(unix).toUTCString(),
    });
  } else {
    res.json({
      unix: parseInt(req.params.date),
      utc: new Date(parseInt(req.params.date)).toUTCString(),
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
