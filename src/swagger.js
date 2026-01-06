import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Notes Taking API",
    description: "Production-ready Notes Taking REST API",
    version: "1.0.0",
  },
  host: "localhost:5000",
  schemes: ["http"],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "JWT Authorization header using Bearer token",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/app.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
