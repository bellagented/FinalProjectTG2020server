import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bp from "body-parser";
import fetch from "node-fetch";
// import Review from "./calls/Review.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

const AIRTABLEAPI = process.env.AIRTABLE_API_KEY;
const AIRTABLEBASEID = process.env.AIRTABLE_BASE_ID;
const AIRTABLETABLENAME = "VideogamingTable"; // table name

// app.get('/', (req, res) => {
//   res.send('Hello World!!!!!!!!!!!!!!!!')
// })

app.get("/view", (req, res) => {
  fetch(
    `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLENAME}?view=Grid%20view`,
    {
      headers: { Authorization: `Bearer ${AIRTABLEAPI}` },
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

app.post("/create", (req, res) => {
  console.log(req.body);

  var datain = req.body;

  var payload = {
    records: [
      {
        fields: datain,
      },
    ],
  };

  //we need to send a "POST" request with our base id, table name, our API key, and send a body with the new data we wish to add.

  fetch(`https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLENAME}`, {
    method: "post", // make sure it is a "POST request"
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${AIRTABLEAPI}`, // API key
      "Content-Type": "application/json", // we will recive a json object
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//backend review personali
const AIRTABLETABLEREVIEW = "RecTable";

app
  .route("/myrev/:name")
  .get((req, res) => {
    fetch(
      `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLEREVIEW}?view=Grid%20view`,
      {
        headers: { Authorization: `Bearer ${AIRTABLEAPI}` },
      }
    )
      .then((res) => res.json())
      .then((tabledata) => {
        const myrec = tabledata.records
          .filter((rec) => {
            return rec.fields.User === req.params.name;
          })
          .map((r) => {
            return { game: r.fields.Game, text: r.fields.Review };
          })
          .reverse();
        return myrec;
      })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .post((req, res) => {
    var datain = req.body;

    var payload = {
      records: [
        {
          fields: datain,
        },
      ],
    };
    fetch(
      `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLEREVIEW}`,
      {
        method: "post", // make sure it is a "POST request"
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${AIRTABLEAPI}`, // API key
          "Content-Type": "application/json", // we will recive a json object
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
