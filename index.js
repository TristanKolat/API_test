// Require the Express module, which is a function
const express = require('express');

// Call the express function which creates an Express application instance
// This instance is traditionally named 'app' and represents your web application
const app = express();

// Define the port number on which the server will listen for requests
const PORT = 8080;

// Use the express.json() middleware, which parses incoming requests with JSON payloads
// This middleware is based on body-parser and is responsible for parsing the JSON content from the incoming request body
app.use(express.json());

// Start the server and listen on the specified PORT
// The callback function is executed once the server is up and running
app.listen(
    PORT,
    () => console.log(`Can be found here http://localhost:${PORT}`) // Template literal is used to include the PORT variable in the log
);

// Define a GET route on the path '/tshirt'
// When a GET request is made to this path, the callback function is executed
app.get('/tshirt', (req, res) => {
    // Send a response with status code 200 (OK) and a JSON object containing t-shirt details
    res.status(200).send({
        tshirt: '👕',  // Emoji used as a value for the tshirt property
        size: 'large'  // Size property set to 'large'
    })
});

// Define a POST route on the path '/tshirt/:id'
// The ':id' is a route parameter that will be captured and stored in req.params
app.post('/tshirt/:id', (req, res) => {
    // Destructure the 'id' from req.params, which contains the route parameters
    // In this case, 'id' represents the t-shirt ID passed in the URL
    const { id } = req.params;

    // Destructure the 'logo' from req.body, which contains the parsed JSON body of the request
    // This assumes that the client sends a JSON object with a 'logo' property in the request body
    const { logo } = req.body;

    // Check if 'logo' is provided, if not, send a 418 (I'm a teapot) status code and a message
    // 418 is a playful status code typically used in teapot-related easter eggs, but here it indicates a missing logo
    if (!logo) {
        res.status(418).send({ message: 'We need a logo!' });
        return; // Return is necessary to prevent the rest of the function from executing
                // Without it, Node.js would attempt to send another response, causing an error
    }

    // Send a response with a JSON object containing the t-shirt and logo details
    // Template literals are used here to embed the 'logo' and 'id' variables into the string
    res.send({
        tshirt: `👕 with your Logo ${logo} and ID: ${id} `,
    });
});

