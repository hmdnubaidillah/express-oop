import app from "./api/server.js";

// start the server
function startApp(): void {
  const port = 5000;
  app.listen(port);
  console.log("Server is running on port", port);
}

startApp();
