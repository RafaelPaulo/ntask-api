module.exports = app => {

    return {
        findAll: (params, callback) => {
            return callback([
                {title: 'Go shopping'},
                {title: 'Fix the PC'}
            ])
        }
    }

}
