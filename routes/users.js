module.exports = app => {

    const Users = app.db.models.Users
    app.route('/user')
        .all(app.auth.authenticate())
        /**
        * @api {get} /user Retrieve the authenticated user
        * @apiGroup User
        * @apiHeader {String} Authorization User token
        * @apiHeaderExample {json} Header
        *   {"Authorization": "JWT xyz.abc.123.hgf"}
        * @apiSuccess {Number} id ID of the register
        * @apiSuccessExample {json} Success
        *   HTTP/1.1 200 OK
        *   {
        *       "id": 1,
        *       "name": "John Connor",
        *       "email": "john@connor.net"
        *   }
        * @apiErrorExample {json} Search error
        *   HTTP/1.1 412 Precondition Failed
        */
        .get((req, res) => {
            Users.findById(req.params.id, {
                attributes: ['id', 'name', 'email']
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message})
            })
        })
        /**
        * @api {delete} /user Delete authenticated user
        * @apiGroup User
        * @apiHeader {String} Authorization User token
        * @apiHeaderExample {json0} Header
        *   {"Authorization": "JWT xyz.abc.123.hgf"}
        * @apiSuccessExample {json} Success
        *   HTTP/1.1 204 No content
        * @apiErrorExample {json} Error excluding
        *   HTTP/1.1 412 Precondition Failed
        */
        .delete((req, res) => {
            Users.destroy({where: {id: req.params.id}})
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message})
            })
        })

        /**
        * @api {post} /users Insert new user
        * @apiGroup User
        * @apiParam {String} name Name
        * @apiParam {String} email Email
        * @apiParam {String} password Password
        * @apiParamExample {json} Entrance
        *   {
        *        "name": "John Connor",
        *        "email": "john@connor.net",
        *        "password": "123456"
        *    }
        * @apiSuccess {Number} id Register ID
        * @apiSuccess {String} name Name
        * @apiSuccess {String} email Email
        * @apiSuccess {String} password Encrypted password
        * @apiSuccess {Date} updated_at Update date
        * @apiSuccess {Date} created_at Registration date
        * @apiSuccessExample {json} Success
        *   HTTP/1.1 200 OK
        *       {
        *           "id": 1,
        *           "name": "John Connor",
        *           "email": "john@connor.net",
        *           "password": "$2a$10$SK1B1",
        *           "updated_at": "2015-09-24T15:46:51.778Z",
        *           "created_at": "2015-09-24T15:46:51.778Z"
        *       }
        * @apiErrorExample {json} Error registering
        *   HTTP/1.1 412 Precondition Failed
        */
    app.post('/users', (req, res) => {
        Users.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message})
        })
    })

}
