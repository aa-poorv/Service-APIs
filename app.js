const app = require("./index");
const mongoConnection = require("./db/dbConnection");

mongoConnection();
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}..`);
});
