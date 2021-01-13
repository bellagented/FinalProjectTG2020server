var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyfzWk2gO1Xz9LXy'}).base('appTtp3ChXo1fpp3K');

const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const bp = require("body-parser");
const fetch = require("node-fetch");

dotenv.config()

app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

const AIRTABLEAPI = require("./config/env").AIRTABLE_API_KEY; // import airtable api key 
const AIRTABLEBASEID = require("./config/env").AIRTABLE_BASE_ID;// import airtable base  id 
const AIRTABLETABLENAME = "VideogamingTable"; // table name


const port = process.env.PORT || 4000;

app.get("/view", (req, res) => {

    //we need to send a "GET" request with our base id table name and our API key to get the existing data on our table. 
    
      fetch(
        `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLENAME}?view=Grid%20view`,
        {
          headers: { Authorization: `Bearer ${AIRTABLEAPI}` } // API key
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });


app.listen(port, () => {    
  console.log("listening on " + port);
});