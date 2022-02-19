import request from "supertest";
import { app } from "../../app";

it("fails when incorrect password supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "signup@example.com",
      password: "password123",
    })
    .expect(400);
});

it("returns a 400 on valid email and invalid password signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "signup@example.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "signup@example.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
