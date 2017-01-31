module.exports = app => {

    const Tasks = app.db.models.Tasks;

    app.route('/tasks')
        .all(app.auth.authenticate())
        /**
        * @api {get} /tasks List tasks
        * @apiGroup Tasks
        * @apiHeader {String} Authorization User token
        * @apiHeaderExample {json} Header
        *   {"Authorization": "JWT xyz.abc.123.hgf"}
        * @apiSuccess {Object[]} tasks Tasks' list
        * @apiSuccess {Number} tasks.id Registration ID
        * @apiSuccess {String} tasks.title Task title
        * @apiSuccess {Boolean} tasks.done Was the task concluded?
        * @apiSuccess {Date} tasks.updated_at Update date
        * @apiSuccess {Date} tasks.created_at Registration date
        * @apiSuccess {Number} tasks.user_id User id
        * @apiSuccessExample {json} Success
        *   HTTP/1.1 200 OK
        *   [{
        *       "id": 1,
        *       "title": "Study",
        *       "done": false
        *       "updated_at": "2015-09-24T15:46:51.778Z",
        *       "created_at": "2015-09-24T15:46:51.778Z",
        *       "user_id": 1
        *   }]
        * @apiErrorExample {json} Query error
        *   HTTP/1.1 412 Precondition Failed
        */
        .get((req, res) => {
            Tasks.findAll({
                    where: {user_id: req.user.id}
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message})
                })
        })
        /**
        * @api {post} /tasks Insert a task
        * @apiGroup Tasks
        * @apiHeader {String} Authorization User token
        * @apiHeaderExample {json} Header
        *   {"Authorization": "JWT xyz.abc.123.hgf"}
        * @apiParam {String} title Task title
        * @apiParamExample {json} Input
        *   {"title": "Study"}
        * @apiSuccess {Number} id Registration ID
        * @apiSuccess {String} title Task title
        * @apiSuccess {Boolean} done=false Was the task concluded?
        * @apiSuccess {Date} updated_at Update date
        * @apiSuccess {Date} created_at Registration date
        * @apiSuccess {Number} user_id User id
        * @apiSuccessExample {json} Success
        *   HTTP/1.1 200 OK
        *   {
        *       "id": 1,
        *       "title": "Study",
        *       "done": false,
        *       "updated_at": "2015-09-24T15:46:51.778Z",
        *       "created_at": "2015-09-24T15:46:51.778Z",
        *       "user_id": 1
        *   }
        * @apiErrorExample {json} Query error
        *   HTTP/1.1 412 Precondition Failed
        */
        .post((req, res) => {
            req.body.user_id = req.user.id
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message})
                })
        })

    app.route('/tasks/:id')
        .all(app.auth.authenticate())
        /**
        * @api {get} /tasks/:id Display a task
        * @apiGroup Tasks
        * @apiHeader {String} Authorization User token
        * @apiHeaderExample {json} Header
        *   {"Authorization": "JWT xyz.abc.123.hgf"}
        * @apiParam {id} id Task ID
        * @apiSuccess {Number} id Registration ID
        * @apiSuccess {String} title Task title
        * @apiSuccess {Boolean} done Was the task concluded?
        * @apiSuccess {Date} updated_at Update date
        * @apiSuccess {Date} created_at Registration date
        * @apiSuccess {Number} user_id User id
        * @apiSuccessExample {json} Success
        *   HTTP/1.1 200 OK
        *   {
        *       "id": 1,
        *       "title": "Study",
        *       "done": false
        *       "updated_at": "2015-09-24T15:46:51.778Z",
        *       "created_at": "2015-09-24T15:46:51.778Z",
        *       "user_id": 1
        *   }
        * @apiErrorExample {json} The task does not exist
        *   HTTP/1.1 404 Not Found
        * @apiErrorExample {json} Query error
        *   HTTP/1.1 412 Precondition Failed
        */
        .get((req, res) => {
            Tasks.findOne({
                    where: {
                        id: req.params.id,
                        user_id: req.user.id
                    }
                })
                .then(result => {
                    if(result){
                        res.json(result)
                    } else {
                        res.sendStatus(404)
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message})
                })
        })
        /**
        * @api {put} /tasks/:id Update a task
        * @apiGroup Tasks
        * @apiHeader {String} Authorization User token
        * @apiHeaderExample {json} Header
        *   {"Authorization": "JWT xyz.abc.123.hgf"}
        * @apiParam {id} id Task ID
        * @apiParam {String} title Task title
        * @apiParam {Boolean} done Was the task concluded?
        * @apiParamExample {json} Input
        *   {
        *       "title": "Work",
        *       "done": true
        *   }
        * @apiSuccessExample {json} Success
        *   HTTP/1.1 204 No Content
        * @apiErrorExample {json} Query error
        *   HTTP/1.1 412 Precondition Failed
        */
        .put((req, res) => {
            Tasks.update(req.body, {where: {
                id: req.params.id,
                user_id: req.user.id
            }})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message})
                })
        })
        /**
        * @api {delete} /tasks/:id Exclude a task
        * @apiGroup Tasks
        * @apiHeader {String} Authorization User token
        * @apiHeaderExample {json} Header
        *   {"Authorization": "JWT xyz.abc.123.hgf"}
        * @apiParam {id} id Task ID
        * @apiSuccessExample {json} Success
        *   HTTP/1.1 204 No Content
        * @apiErrorExample {json} Query error
        *   HTTP/1.1 412 Precondition Failed
        */
        .delete((req, res) => {
            Tasks.destroy({where: {
                id: req.params.id,
                user_id: req.user.id
            }})
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message})
            })
        })

}
