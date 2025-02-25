export default useForm;
import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const db = new Database("./todo.db");
const app = express();

app.get("");

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
