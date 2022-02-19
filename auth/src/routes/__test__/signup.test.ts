import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "signup@example.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 on invalid email signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "signupexample.com",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 on invalid password signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "signupe@xample.com",
      password: "o",
    })
    .expect(400);
});

it("returns a 400 on invalid password and email signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "signupe@xample.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "ofefgegrer",
    })
    .expect(400);
});

it("disallow duplicate email in signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "signup@example.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "signup@example.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "signup@example.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
