module.exports = {
    database: 'ntask_test',
    username: 'rafaelpaulo',
    password: 'senha@senha',
    params: {
        dialect: 'sqlite',
        storage: 'ntask.sqlite',
        logging: false,
        define: {
            underscored: true
        }
    },
    jwtSecret: 'NTASK_TEST',
    jwtSession: {session: false}
}
