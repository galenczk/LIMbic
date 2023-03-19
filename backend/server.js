const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3030;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./db-connector");

/**
 * **********************************PROJECT ROUTES*******************************************
 */
// ROUTE - GET ALL PROJECTS
app.get("/projects", (req, res) => {
    const query = "SELECT * FROM Projects;"
    db.pool.query(query, (error, result) => {
        if (!error){
            res.send(JSON.stringify(result))
        } else{
            console.log(error)
        }
    })
})






/**
 * ERROR HANDLING
 */
app.use((error, req, res, next) => {
    console.error(`Unhandled error ${error}, URL = ${req.originalURL}, method = ${req.method}`);
    res.send("500 - Server Error");
});

/**
 * SERVER LISTENING
 */
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
