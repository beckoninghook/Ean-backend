import chai from "chai";
import chaiHttp from "chai-http";
import {SequelizeUser} from "../../../src/database/db-models/SequelizeUser";
import {SequelizeShareRecord} from "../../../src/database/db-models/SequelizeShareRecord";

chai.use(chaiHttp);

describe('ShareController', () => {
    beforeEach(async () => {
        await SequelizeShareRecord.destroy(
            {
                where: {},
            }
        )
        await SequelizeUser.destroy(
            {
                where: {},
            }
        )
    })

    it('should be able to insert a share record for a nonexisting user', (done) => {
        const shareRecord = {
                id: 1,
                email: "test@gmail.com",
            }

        chai.request("http://localhost:8082")
            .post('/api/v1/share')
            .send(shareRecord)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done()
            });
    })

    it('should be able to retrieve the counted shares for a user',  async () => {
        let user = new SequelizeUser()
        user.email = "test@gmail.com"
        user.userId = 1
        try {
            user = await user.save()

            for (let i = 0; i < 3; i++) {
                await new SequelizeShareRecord().$set('user', user)
            }
        } catch(e) {
            console.log(e)
        }

        const res = await chai.request("http://localhost:8082")
            .get('/api/v1/share/' + user.userId)

        console.log(res.body)

        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.count.should.equal(3)
    })

    it('should return status code 404 NOT FOUND when no user is found in GET request', async () => {
        const res = await chai.request("http://localhost:8082")
            .get('/api/v1/share/' + 1)
        res.should.have.status(404)
    })

    it('should return status code 400 BAD REQUEST when no user id is specified in GET request', async () => {
        const res = await chai.request("http://localhost:8082")
            .get('/api/v1/share/')
        res.should.have.status(400)
    })

    it('should return status code 400 BAD REQUEST when no user data is attached to POST request', async () => {
        const res = await chai.request("http://localhost:8082")
            .post('/api/v1/share/')
        res.should.have.status(400)
    })

    after(async () => {
        await SequelizeUser.destroy(
            {
                where: {},
            }
        )
        await SequelizeShareRecord.destroy(
            {
                where: {},
            }
        )
    })
})
