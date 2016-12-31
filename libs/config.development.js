module.exports = {
    database: 'ntask',
    username: 'rafaelpaulo',
    password: 'senha@senha',
    params: {
        dialect: 'sqlite',
        storage: 'ntask.sqlite',
        define: {
            underscored: true
        }
    },
    jwtSecret: 'Nta$K-AP1',
    jwtSession: {session: false}
}
