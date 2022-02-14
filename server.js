// index.js (server)
const express = require("express");
const cors = require("cors")  // install cors
const bodyParser = require("body-parser");
var dateFormat = require('dateformat');

const app = express();
app.set("port", 5432);

app.use(cors())
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
    host: "ec2-18-215-8-186.compute-1.amazonaws.com",
    user: "sqswklfxrepflp",
    password: "faf953a77e258671c0c32c90a40900c207fe2489f42b0783e4e70483c1fbfcd2",
    database: "df1vjjcla4od5f"
};

const pool = new Pool(config);

// app.post("/add-time", async (req, res) => {
//     const name = req.body.name;
//     const time = req.body.time;
//     // It would be better to set the time server-side
//     const timeStamp = dateFormat(time, dateFormat.masks.isoDateTime)

//     const template = 'INSERT INTO times(name, time) VALUES($1, $2)'
//     const response = await pool.query(template, [name, timeStamp])

//     res.end()
// });

app.get("/", async (req, res) => {
    const template = await pool.query('SELECT * FROM salesforce.account');
    res.json({ times: template.rows });

})

app.listen(app.get("port"), () => {
    console.log(`Server at: http://localhost:${app.get("port")}/`);
});