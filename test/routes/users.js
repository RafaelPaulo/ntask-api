import jwt from 'jwt-simple'

describe('Routes: Users', () => {
    const Users = app.db.models.Users
    const jwtSecret = app.libs.config.jwtSecret

    let token

    const userMocked = {
        name: 'John2',
        email: 'john2@mail.net',
        password: '12345'
    }

    beforeEach(done => {
        Users
            .destroy({where: {}})
            .then(() => Users.create(userMocked))
            .then(user => {
                token = jwt.encode({id: user.id}, jwtSecret)
                done()
            })
    })

    describe('GET /users', () => {
        describe('status 200', () => {
            it('should return user datas', done => {
                request.get('/user')
                    .set('Authorization', `JWT ${token}`)
                    .expect(200)
                    .end((err, res) =>  {
                        expect(res.body.id).to.exist
                        expect(res.body.name).to.be.equal(userMocked.name)
                        expect(res.body.email).to.be.equal(userMocked.email)
                        done(err)
                    })
            })
        })
    })

    describe('DELETE /users', () => {
        describe('status 200', () => {
            it('should return the status code 204 (No content)', done => {
                request
                    .delete('/user')
                    .set('Authorization', `JWT ${token}`)
                    .expect(204)
                    .end((err, res) => {
                        expect(res.body).to.be.empty
                        done(err)
                    })
            })
        })
    })

    describe('POST /users', () => {
        describe('status 200', () => {
            beforeEach(() => {
                Users
                    .destroy({where: {}})
            })

            it('should create a user successfully', done => {
                request
                    .post('/users')
                    .send(userMocked)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.id).to.exist
                        expect(res.body.name).to.be.equal(userMocked.name)
                        expect(res.body.email).to.be.equal(userMocked.email)
                        expect(res.body.password).to.exist
                        expect(res.body.updated_at).to.exist
                        expect(res.body.created_at).to.exist
                        done(err)
                    })
            })
        })
    })

})
