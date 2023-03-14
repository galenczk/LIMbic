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
 * TEST INPUT
 */
app.post("/numbers", (req, res) => {
    const number = 42;

    const query = "INSERT INTO Numbers (numbers) VALUES (?)";

    db.pool.query(query, [number], (error) => {
        if (!error) {
            res.status(201).send(`Insert of ${number} successful!`);
        } else {
            console.log(error);
        }
    });
});

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
