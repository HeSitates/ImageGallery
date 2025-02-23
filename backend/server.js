const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}/public/images`; // Base URL for images
const IMAGES_DIR = path.join(__dirname, "public/images");

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

function getImages(dir, baseDir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getImages(filePath, baseDir, fileList);
        } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
            const relativePath = "/" +  path.relative(baseDir, filePath).replace(/\\/g, "/");
            fileList.push({
                url: `${BASE_URL}${relativePath}`,
                name: relativePath,
                filename: file
            });
        }
    });
    return fileList.sort((a, b) => a.filename.localeCompare(b.filename));
}

app.get("/api/images", (req, res) => {
    const images = getImages(IMAGES_DIR, IMAGES_DIR);
    res.json(images);
});

app.listen(PORT, () => console.log(`Server running on ${BASE_URL}`));
