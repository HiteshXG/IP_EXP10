const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 5000;

app.use(cors());

app.use("/media", express.static(path.join(__dirname, "media")));

app.get("/api/media", (req, res) => {
  const mediaDir = path.join(__dirname, "media");
  fs.readdir(mediaDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to scan media directory" });
    }

    const mediaFiles = files.map((file) => {
      const ext = path.extname(file).toLowerCase();
      let type = "unknown";
      if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext)) type = "image";
      else if ([".mp4", ".webm"].includes(ext)) type = "video";
      else if ([".mp3", ".wav"].includes(ext)) type = "audio";

      return {
        name: file,
        type: type,
        url: `/media/${file}`,
      };
    });

    res.json(mediaFiles);
  });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
