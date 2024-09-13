import { faker } from "@faker-js/faker";

export class UserBuilder {
    constructor() {
        this.username = faker.internet.userName();
        this.password = faker.internet.password();
        this.biography = faker.lorem.sentence(20);
        this.size = faker.number.int({ min: 35, max: 48 });
        this.urlImage = "https://lh5.googleusercontent.com/proxy/qLv8SoOi7odqcIveS66RiDdIdYtpo-OF1-9nHQK6vGIrIDzAY539oYyvijNy5o0nFZshoXZoMRK0rW8JqEc3RgwKGM5_jBGVASnRGZMG9O_g"
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