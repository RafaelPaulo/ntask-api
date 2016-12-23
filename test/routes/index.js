describe('Route: Index', () => {
    describe('get /', () => {
        it('Returns the API status', done => {
            request.get('/')
                .expect(200)
                .end((err, res) => {
                    const expected = {status: 'NTask API'}
                    expect(res.body).to.eql(expected)
                    done(err)
                })
        })
    })
})
