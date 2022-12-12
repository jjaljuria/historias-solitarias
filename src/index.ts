import { app } from "./app";
import "./database";

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
