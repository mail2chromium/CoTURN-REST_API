var crypto = require('crypto');

function getICEServers(name){    

    var credential;

    /**You will use the same secret key inside turn.conf file i.e. --static-auth-secret=<secret> 
     * Uncomment the following statements and add static secret key
     * 
     * > --use-auth-secret
     * > --static-auth-secret=<secret>
    */
    const secret = "QE7R4I17vd1J58aqcy7DdzHm";

    /** Domain on which CoTURN Server is running. Such as; turn:turn.example.com */
    /** When you are running your coturn server locally i.e. 127.0.0.1
     *  Just Change turn_domain <coturn server ip-address / sub-domain>
     */
    const turn_domain = "127.0.0.1"; 

    /**When you are running your coturn server on cloud servers i.e. turn.example.com */
    // const turn_domain = "";

    var unixTimeStamp = parseInt(Date.now()/1000) + 24*3600,
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
    
    return result;
}


const http = require('http');

var server = http.createServer(function(request, response) {
if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            try {
              var post = JSON.parse(body);

              console.log(post); // <--- here I just output the parsed JSON
              console.log(getICEServers(post.username));
              response.writeHead(200, {"Content-Type": "text/plain"});
              response.write(JSON.stringify(getICEServers(post.username)));

              response.end();

            }catch (err){
              response.writeHead(500, {"Content-Type": "text/plain"});
              response.write("Bad Post Data.  Is your data a proper JSON?\n");
              response.end();
              /** Reinitiating the process. */
              console.log("Reinitiating the server ...")
              server.close();
              server.listen(3000);
              console.log("Server is started...")
         
            }
        });
    }
});

server.listen(3000);
console.log("Server is started...");
