import { init as configurationDefaultInit } from "./default-config.js";
import { init as configurationDevInit } from "./dev-config.js";
import { init as configurationTestInit } from "./test-config.js"

export async function init() {
    switch (process.env.ENV) {
        case "test ":
            await configurationTestInit();
            break;
        case "dev ":
            await configurationDevInit();
            break;
        case "prod ":
            await configurationDefaultInit();
            break;
    
        default:
            await configurationDefaultInit();
            break;
    }
}
