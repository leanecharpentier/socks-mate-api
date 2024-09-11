const { init } = await import("../../bin/config.js");
await init();

const { Db } = await import("../../config/db.js");
await Db.connect();

const { Server } = await import("../../server.js");
const server = new Server();
const app = server.getApp()

export default app
