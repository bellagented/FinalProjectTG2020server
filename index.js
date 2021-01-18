import dotenv  from "dotenv"
import express from "express"
import cors from "cors"
import bp from "body-parser"
import fetch from "node-fetch"



dotenv.config()

const app = express()
const port = process.env.PORT || 4000

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
          headers: { Authorization: `Bearer ${AIRTABLEAPI}` } 
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
            Authorization: `Bearer ${AIRTABLEAPI}`,   // API key
            "Content-Type": "application/json",  // we will recive a json object
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
      
      
app.post("/update", (req, res) => {
        console.log(req.body);
      
        var datain = req.body;
      
        var payload = {
          records: [
            {
              id: datain.id,
              fields: datain.updatedata,
            },
          ],
        };
      
      //to update a record we have to send the new record with it's the id to Airtable API. 
      
      
        fetch(`https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLENAME}`, {
          method: "patch", // make sure it is a "PATCH request"
          body: JSON.stringify(payload),
          headers: {
            Authorization: `Bearer ${AIRTABLEAPI}`, // API key
            "Content-Type": "application/json",
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
        
app.post("/delete", (req, res) => {
        console.log(req.body);
      
        //we need to send a "DELETE" request with our base id table name, the id of the record we wish to delete and our API key to get the existing data on our table.
      
        fetch(
          `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLENAME}/${req.body.id}`,
          {
            method: "delete",
            //body: JSON.stringify(payload),
            headers: {
              Authorization: `Bearer ${AIRTABLEAPI}`,
                 "Content-Type": "application/json",
            },
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
          
            return { game: r.fields.Game, text: r.fields.Review, comments:JSON.parse(r.fields.Comments), id:r.id};
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
  })
  .patch((req, res) => {
    var datain = req.body;

    var payload = {
      records: [
        datain,
        
      ],
    };
    
    fetch(
      `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLEREVIEW}`,
      {
        method: "patch", // make sure it is a "POST request"
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


  //backend post
  const AIRTABLETABLEPOST = "PostTable";

  app
    .route("/post")
    .get((req, res) => {
      fetch(
        `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLEPOST}?view=Grid%20view`,
        {
          headers: { Authorization: `Bearer ${AIRTABLEAPI}` },
        }
      )
        .then((res) => res.json())
        .then((tabledata) => {
          const myrec = tabledata.records
            .map((r) => {
            
              return { from: r.fields.User, text: r.fields.Post,img:r.fields.Img, comments:JSON.parse(r.fields.Comments), id:r.id,type:"post"};
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
        `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLEPOST}`,
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
    })
    .patch((req, res) => {
      var datain = req.body;
  
      var payload = {
        records: [
          datain,
          
        ],
      };
      
      fetch(
        `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLEPOST}`,
        {
          method: "patch", 
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

 //backend lista dei desideri personale

 const AIRTABLETABLEWISHLIST = "WishlistTable";

 app
   .route("/mylist/:name")
   .get((req, res) => {
     fetch(
       `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLEWISHLIST}?view=Grid%20view`,
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
             return { game: r.fields.Game, id: r.id, url: r.fields.Img };
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
       `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLEWISHLIST}`,
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
})
    .delete((req, res) => {
      var datain = req.body;

  //     var payload = {
  //       records: [
  //         datain,
      
  //   ],
  // };
  
  fetch(
    `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLEWISHLIST}/${req.body.id}`,
    {
      method: "delete", 
      // body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${AIRTABLEAPI}`, // API key
        // "Content-Type": "application/json", // we will recive a json object
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




  app
      .route("/gamedetail")
      .post((req, res) => {
        
        fetch("https://rawg-video-games-database.p.rapidapi.com/games/"+ req.body.name, {
          method : "GET",
          headers : {
            "x-rapidapi-key": "0bbf63d1ebmsh55d1423dcde490ep1f3a90jsn8208e67fac5f",
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "useQueryString": true
          }
        })
        .then((res) => res.json())
        .then((gamedata) => {
         
          return {name: gamedata.name, url: gamedata.background_image };
        })
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