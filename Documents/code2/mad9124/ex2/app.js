
 const car  = require("./cars.js");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.send("Hello from Express!");
  

  response.code = 201; // created
});
  const port = 3030; // this should go near the top of the file
  app.get("/api", (request, response) => {
    response.send({
      data: {
        message: "Hello from Express!"
      }
    });
  });
  app.get("/api/cars", (request, response) => {
    response.send({ data: car });
  });
app.listen(port, err => {
  if (err) return console.log("something bad happened", err);
  console.log(`The server is listening on ${port}`);
});

