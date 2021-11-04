const express = require("express");
const cors = require("cors");

const db = require("./models");
const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "SSG WEBDEVELOP TEAM STUDY API",
            version: "1.0.0",
            description: "React Study API",
        },
        host: "localhost:3000",
        basePath: "/",
    },
    apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
db.sequelize
    .sync()
    .then(() => {
        console.log("db connected");
    })
    .catch(console.error);

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3065, () => {
    console.log("Study API Server Start on port 3065");
});
