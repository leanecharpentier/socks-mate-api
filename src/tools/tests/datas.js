import { faker } from "@faker-js/faker";

export class UserBuilder {
    constructor() {
        this.username = faker.internet.userName();
        this.password = faker.internet.password();
        this.biography = faker.lorem.text();
        this.size = faker.number.int({ min: 35, max: 48 });
    }

    withUsername(username) {
        this.username = username;
        return this;
    }

    withPassword(password) {
        this.password = password;
        return this;
    }

    withSize(size) {
        this.size = size;
        return this;
    }
}