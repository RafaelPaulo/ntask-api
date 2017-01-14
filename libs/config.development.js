import logger from './logger.js'

module.exports = {
    database: 'ntask',
    username: 'rafaelpaulo',
    password: 'senha@senha',
    params: {
        dialect: 'sqlite',
        storage: 'ntask.sqlite',
        logging: (sql) => {
            logger.info(`[${new Date()}] ${sql}`);
        },
        define: {
            underscored: true
        }
    },
    jwtSecret: 'Nta$K-AP1',
    jwtSession: {session: false}
}
