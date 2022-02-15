import express from "express";
import { json } from "body-parser";

// Routing Imports
import { currentUserRouter } from "./routes/current-user";
import { signUpUserRouter } from "./routes/signup";
import { signInUserRouter } from "./routes/signin";
import { signOutUserRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signInUserRouter);
app.use(signOutUserRouter);
app.use(signUpUserRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("==>> Listening on port 3000 <<==");
});
