# CoTURN-REST_API

Enterprise Level REST API to get ICE Servers from the custom deployment of CoTURN TURN Server.

I have made a complete basic tutorial on Medium to give you great idea to deploy enterprise-level coturn and rest api. Please visit:

- [CoTURN REST API Development & Deployment](https://medium.com/@BeingOttoman/coturn-rest-api-development-deployment-7bac065c64aa)

----

Execution of REST API:

The usage of this REST API is quite easy. One can use the following commands for local setup;

```

- git clone https://github.com/mail2chromium/CoTURN-REST_API.git

- cd CoTURN-REST_API 

- node src/coturn_rest_api.js

```

You will get the following things on your local machine:

![image](https://user-images.githubusercontent.com/42235538/214395017-4cc5385f-6ef4-4172-ae85-73477f9c0b05.png)

----

## Deployment:

You can deploy this REST API on any platform of your choice, but If you are really good with cloud functions, you can make the use of coturn REST API relatively in a more easy way. To deploy and run the cloud function, please follow the following commands;

> To deploy a cloud function, one should have to get a blaze account first.

Make sure your system has nodeJS and NPM installed. Once you have Node.js and npm installed, install the Firebase CLI via your preferred method.  use:

```
# To install the CLI via npm
- npm install -g firebase-tools

# Go back to project root directory
- cd ..
- cd coturn-cloud-function

# Login to your Firebase account via cmd or terminal;
- firebase login

- firebase init functions

```

The CLI prompts you to choose an existing codebase or initialize and name a new one. When you're just getting started, a single codebase in the default location is adequate; later, as your implementation expands, you might want to organize functions in codebases. After that proceed to the following directory to implement and deploy CoTURN REST API.

```

- cd coturn-cloud-function/
- firebase deploy

```

You will have your coturn rest api on public platform, and you can make simple POST request to get different ICE Servers for different users based on usernames.




