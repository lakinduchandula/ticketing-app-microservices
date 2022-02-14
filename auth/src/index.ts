import express from "express";
import { json } from "body-parser";

// Routing Imports
import { currentUserRouter } from "./routes/current-user";
import { signUpUserRouter } from "./routes/signup";
import { signInUserRouter } from "./routes/signin";
import { signOutUserRouter } from "./routes/signout";

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signInUserRouter);
app.use(signOutUserRouter);
app.use(signUpUserRouter);

app.listen(3000, () => {
  console.log("==>> Listening on port 3000 <<==");
});
