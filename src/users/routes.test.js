import request from "supertest"
import { strictEqual } from "assert";
import Joi from "joi";
import { faker } from "@faker-js/faker";

import app from "../tools/tests/mochaSetup.js"
import { UserBuilder } from '../tools/tests/datas.js';
import { User } from "./models.js";
import { clearDatabase, generateToken, hashPassword } from "../tools/helpers.js";

describe("addUser", () => {
    afterEach(async () => {
        await clearDatabase()
    })
    it("Should add user", async () => {
        const user = new UserBuilder()
        const response = await request(app)
            .post("/users")
            .send(user)
            .expect(200)

    })
    it("Should return error 400 (size is missing)", async () => {
        const user = new UserBuilder()
        user.size = undefined
        const response = await request(app)
            .post("/users")
            .send(user)
            .expect(400)

    })
})

describe("login", () => {
    afterEach(async () => {
        await clearDatabase()
    })
    it("Should login", async () => {
        const userBuilder = new UserBuilder()
        const user = new User(userBuilder)
        user.password = await hashPassword(user.password)
        await user.save()

        const response = await request(app)
            .post("/users/login")
            .send({
                username: userBuilder.username,
                password: userBuilder.password
            })
            .expect(200)
        const schema = Joi.object({
            token: Joi.string().required(),
            userId: Joi.string().valid(user._id.toString()).required()
        })
        await schema.validateAsync(response.body)
        
    })
    it("Should return error 400 (password si missing)", async () => {
        const userBuilder = new UserBuilder()
        const user = new User(userBuilder)
        user.password = await hashPassword(user.password)
        await user.save()

        const response = await request(app)
            .post("/users/login")
            .send({
                username: userBuilder.username,
            })
            .expect(400)
    })
    it("Should return error 400 (username si missing)", async () => {
        const userBuilder = new UserBuilder()
        const user = new User(userBuilder)
        user.password = await hashPassword(user.password)
        await user.save()

        const response = await request(app)
            .post("/users/login")
            .send({
                password: userBuilder.password
            })
            .expect(400)
    })
})

describe("getUserById", () => {
    afterEach(async () => {
        await clearDatabase()
    })
    it("Should add user", async () => {
        const userBuilder = new UserBuilder()
        const user = new User(userBuilder)
        await user.save()

        const { token } = await generateToken()

        const response = await request(app)
            .get(`/users/${user._id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)

        strictEqual(response.body.username, user.username)
        strictEqual(response.body.biography, user.biography)
        strictEqual(response.body.size, user.size)

    })
})

describe("getUsers", () => {
    afterEach(async () => {
        await clearDatabase()
    })
    it("Should get users", async () => {
        const nbUsers = faker.number.int({ min: 0, max: 10})
        for (let i = 0; i < nbUsers; i++) {
            const userBuilder = new UserBuilder()
            const user = new User(userBuilder)
            await user.save()
        }

        const { token } = await generateToken()

        const response = await request(app)
            .get("/users/")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)

        strictEqual(response.body.length, nbUsers+1)
    })
    it("Should return error 404", async () => {
        const { token } = await generateToken()
        await User.deleteMany({})
        await request(app)
            .get("/users/")
            .set("Authorization", `Bearer ${token}`)
            .expect(404)
    })
})

describe("giveLike", () => {
    afterEach(async () => {
        await clearDatabase()
    })
    it("Should get users", async () => {
        const userBuilder = new UserBuilder()
        const user = new User(userBuilder)
        await user.save()

        const { token, userId } = await generateToken()

        const response = await request(app)
            .post(`/users/${user._id}/like`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)

        const user1 = await User.findById(userId)        
        const user2 = await User.findById(user._id)   
        
        strictEqual(user1.giveLikes.includes(user._id), true)
        strictEqual(user2.receiveLikes.includes(userId), true)

    })
})