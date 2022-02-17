import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

// Routing Imports
import { currentUserRouter } from "./routes/current-user";
import { signUpUserRouter } from "./routes/signup";
import { signInUserRouter } from "./routes/signin";
import { signOutUserRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

/* Traffic has been proxied to our application through ingress-nginx, 
 * express gonna see the fact that traffic has been proxied and by default,
 * express gonna say 'I don't really trust this https connection'
 ** Adding this app.set(...) to make sure that express is aware behind the proxy (ingress-nginx)
    And to make sure this traffic even though it is comming from that proxy
*/
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption on this cookie
    secure: true, // only be use if user visiting our website throug => https://
  })
);

app.use(currentUserRouter);
app.use(signInUserRouter);
app.use(signOutUserRouter);
app.use(signUpUserRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  // check before application start environment variables get defined correctly
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined");
  }

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
