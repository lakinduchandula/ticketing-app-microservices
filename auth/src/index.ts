import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

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

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("==>> Connected to MongoDB");
  } catch (err) {
    console.log("Error Pop-up ==> " + err);
  }

  app.listen(3000, () => {
    console.log("==>> Listening on port 3000 <<==");
  });
};

start();
