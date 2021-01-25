
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/application"
import  {testDatabase} from "../../../src/database/testDatabase"
import Config from "../../../src/config";
const should = chai.should();

chai.use(chaiHttp);

describe('ShareController', () => {
    before(() => {
        testDatabase.sync({force:true}).then(app.listen(Config.TEST_PORT))
    })

    it('should be able to insert a share record for a nonexisting user', (done) => {
        const shareRecord = {
            user: {
                userId: 1,
                userEmail: "test@gmail.com",
            }
        }

        chai.request
    })

    it('should be able to retrieve the counted shares for a user', () => {

    })
})
