import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

var crypto = require('crypto');
const cors = require('cors')({origin: true});
var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
// var serviceAccount = require("./fir-d1884-firebase-adminsdk-b7ljo-ea126ade7d.json");
var serviceAccount = require("");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "Enter Database URL"
});

export const GetICEServers = functions.https.onRequest(async(request, response) => {

  cors(request, response, async () => {
         const jsonObj = request.body;

         var name = jsonObj['username']
         var username: string;
         var credential;

         const turn_domain = "example.domain.com";

         const secret = "QE7R4I17vd1J58aqcy7DdzHm";
         var unixTimeStamp = ((new Date().getTime())) + 24 * 3600,
             username = [unixTimeStamp, name].join(':'),
             password,
             hmac = crypto.createHmac('sha1', secret);

         hmac.setEncoding('base64');
         hmac.write(username);
         hmac.end();
         password = hmac.read();
         credential = password;

         var result = {
          "ice_servers": [
              {
                  "url": "stun:"+ turn_domain +":3478"
              },
              {
                  "username": username,
                  "url": "turn:"+""+ turn_domain +""+":80?transport=udp",
                  "credential": credential
              },
              {
                  "username": username,
                  "url": "turn:"+ turn_domain +":3478?transport=udp",
                  "credential": credential
              },
              {
                  "username": username,
                  "url": "turn:"+ turn_domain +":80?transport=tcp",
                  "credential": credential
              },
              {
                  "username": username,
                  "url": "turn:"+ turn_domain +":3478?transport=tcp",
                  "credential": credential
              },
              {
                  "username": username,
                  "url": "turns:"+ turn_domain +":443?transport=tcp",
                  "credential": credential
              },
              {
                  "username": username,
                  "url": "turns:"+ turn_domain +":5349?transport=tcp",
                  "credential": credential
              }
          ]
      };
      
      response.send(JSON.stringify(new Result(true, undefined, result)))
    })
});
