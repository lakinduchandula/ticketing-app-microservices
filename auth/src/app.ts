import express from "express";
import "express-async-errors";
import { json } from "body-parser";
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
    // secure: true, // only be use if user visiting our website throug => https://
    secure: process.env.NODE_ENV !== 'test',
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

export { app };
