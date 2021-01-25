import {testDatabase} from "../src/database/testDatabase";
import app from "../src/application";
import Config from "../src/config";

let server;

before(async () => {
    await testDatabase.sync({force: true, logging: false})
    server = await app.listen(Config.TEST_PORT)
})

after(async () => {
    await testDatabase.connectionManager.close();
    await server.close();
})
