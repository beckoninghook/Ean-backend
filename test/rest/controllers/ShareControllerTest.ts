import chai from "chai";
import chaiHttp from "chai-http";
import {SequelizeUser} from "../../../src/database/db-models/SequelizeUser";
import {SequelizeShareRecord} from "../../../src/database/db-models/SequelizeShareRecord";

chai.use(chaiHttp);

describe('ShareController', () => {
    beforeEach((done) => {
        SequelizeShareRecord.destroy(
            {
                where: {},
            }
        )
        SequelizeUser.destroy(
            {
                where: {},
            }
        )
        done()
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
