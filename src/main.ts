import app from "./api/server.js";

// server config
function startApp() {
  app.listen(app.get("PORT"));
  console.log(`Server running on port ${app.get("PORT")}`);
}

startApp();
