const express = require("express");
const fs = require('fs');
const https = require('https');
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const router = require("./router");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();

const reqAuth = require("./middleWare/requestAuth");
// DB Connection
require("./database/connection");
// Middle wares
app.use(express.json());
app.use(cookieParser());
// Cors Setup
app.use(
    cors({
        origin: [process.env.SERVER_URL, "https://checkout.stripe.com"],
        credentials: true,
        methods: "GET,PUT,POST",
    })
);

app.set("trust proxy", 1);

app.use(reqAuth);

app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(router);


const http = require('http');

// // Create an HTTP server
const httpServer = http.createServer(app);

// // Server Listening
httpServer.listen(5000, '0.0.0.0', () => {
    console.log(`Server running on port ${5000}`);
})
