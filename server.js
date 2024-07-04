const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let publicPath = path.join(__dirname, "public");

const app = express();
app.use(express.static(publicPath)); // its made static path :)
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(publicPath, "editor.html"));
})

// upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imageName = date.getDate() + date.getTime() + file.name;
    // image upload path
    let uploadPath = path.join(publicPath, 'uploads', imageName);

    // create upload
    file.mv(uploadPath, (err) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imageName}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(publicPath, "blog.html"));
})

app.use((req, res) => {
    res.json("404");
})    // keep this at last because order matters in express server, because express will keep listening these functions always

app.listen("3000", () => {
    console.log('listening on port 3000...');
})
