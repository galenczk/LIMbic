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
 * **********************************CLIENT ROUTES*******************************************
 */
// GET ALL CLIENTS
app.get("/clients", (req, res) => {
    const query = "SELECT * FROM Clients;";
    db.pool.query(query, (error, result) => {
        if (!error) {
            res.send(JSON.stringify(result));
        } else {
            console.log(error);
        }
    });
});

// GET SPECIFIC CLIENT ON id_client
app.get("/clients/:id_client", (req, res) => {
    const id_client = req.params.id_client;
    const query = `SELECT id_client, client_name, client_address, client_phone, client_email, client_type, client_notes FROM Clients WHERE Clients.id_client = ?`;
    db.pool.query(query, id_client, async (error, result) => {
        if (!error) {
            res.status(201).send(JSON.stringify(result));
        } else {
            console.log(error);
        }
    });
});

// ADD NEW CLIENT
app.post("/clients", (req, res) => {
    const client_name = req.body.client_name;
    const client_address = req.body.client_address;
    const client_phone = req.body.client_phone;
    const client_email = req.body.client_email;
    const client_type = req.body.client_type;
    const client_notes = req.body.client_notes;

    const query =
        "INSERT INTO Clients (client_name, client_address, client_phone, client_email, client_type, client_notes) VALUES (?,?,?,?,?,?)";

    db.pool.query(
        query,
        [client_name, client_address, client_phone, client_email, client_type, client_notes],
        (error) => {
            if (!error) {
                res.status(201).send(`Insert of ${client_name} successful!`);
            } else {
                console.log(error);
            }
        }
    );
});
/**
 * **********************************MANAGER ROUTES*******************************************
 */
// GET ALL MANAGERS
app.get("/managers", (req, res) => {
    const query = "SELECT * FROM Managers;";
    db.pool.query(query, (error, result) => {
        if (!error) {
            res.send(JSON.stringify(result));
        } else {
            console.log(error);
        }
    });
});

// GET SPECIFIC MANAGER ON id_manager
app.get("/managers/:id_manager", (req, res) => {
    const id_manager = req.params.id_manager;
    const query = `SELECT id_manager, manager_name, manager_phone, manager_email FROM Managers WHERE Managers.id_manager = ?`;
    db.pool.query(query, id_manager, async (error, result) => {
        if (!error) {
            res.status(201).send(JSON.stringify(result));
        } else {
            console.log(error);
        }
    });
});

// ADD NEW MANAGER
app.post("/managers", (req, res) => {
    const manager_name = req.body.manager_name;
    const manager_phone = req.body.manager_phone;
    const manager_email = req.body.manager_email;

    const query = "INSERT INTO Managers (manager_name, manager_phone, manager_email) VALUES (?,?,?)";

    db.pool.query(query, [manager_name, manager_phone, manager_email], (error) => {
        if (!error) {
            res.status(201).send(`Insert of ${manager_name} successful!`);
        } else {
            console.log(error);
        }
    });
});
/**
 * **********************************PROJECT ROUTES*******************************************
 */
// GET ALL PROJECTS
app.get("/projects", (req, res) => {
    const query = "SELECT * FROM Projects;";
    db.pool.query(query, (error, result) => {
        if (!error) {
            res.send(JSON.stringify(result));
        } else {
            console.log(error);
        }
    });
});

// GET SPECIFIC PROJECT ON id_project
app.get("/projects/:id_project", (req, res) => {
    const id_project = req.params.id_project;
    const query = `SELECT id_project, id_client, id_manager, id_tech, project_num_client, project_name, num_samples, turn_around_time FROM Projects WHERE Projects.id_project = ?`;
    db.pool.query(query, id_project, async (error, result) => {
        if (!error) {
            res.status(201).send(JSON.stringify(result));
        } else {
            console.log(error);
        }
    });
});

// ADD NEW PROJECT
app.post("/projects", (req, res) => {
    const id_client = req.body.id_client;
    const project_name = req.body.project_name;
    const project_type = req.body.project_type;
    const project_num_client = req.body.project_num_client;
    const num_samples = req.body.num_samples;
    const turn_around_time = req.body.turn_around_time;

    const query =
        "INSERT INTO Projects (id_client, project_name, project_type, project_num_client, num_samples, turn_around_time) VALUES (?,?,?,?,?,?)";

    db.pool.query(
        query,
        [id_client, project_name, project_type, project_num_client, num_samples, turn_around_time],
        (error) => {
            if (!error) {
                res.status(201).send(`Insert of ${project_name} successful!`);
            } else {
                console.log(error);
            }
        }
    );
});
/**
 * **********************************TECH ROUTES*******************************************
 */
// GET ALL TECHS
app.get("/techs", (req, res) => {
    const query = "SELECT * FROM Technicians;";
    db.pool.query(query, (error, result) => {
        if (!error) {
            res.send(JSON.stringify(result));
        } else {
            console.log(error);
        }
    });
});

// GET SPECIFIC TECH ON id_tech
app.get("/techs/:id_tech", (req, res) => {
    const id_tech = req.params.id_tech;
    const query = `SELECT id_tech, tech_name, tech_phone, tech_email FROM Technicians WHERE Technicians.id_tech = ?`;
    db.pool.query(query, id_tech, async (error, result) => {
        if (!error) {
            res.status(201).send(JSON.stringify(result));
        } else {
            console.log(error);
        }
    });
});

// ADD NEW TECH
app.post("/techs", (req, res) => {
    const tech_name = req.body.tech_name;
    const tech_phone = req.body.tech_phone;
    const tech_email = req.body.tech_email;

    const query = "INSERT INTO Technicians (tech_name, tech_phone, tech_email) VALUES (?,?,?)";

    db.pool.query(query, [tech_name, tech_phone, tech_email], (error) => {
        if (!error) {
            res.status(201).send(`Insert of ${tech_name} successful!`);
        } else {
            console.log(error);
        }
    });
});

//*******************************************************************************************************
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
