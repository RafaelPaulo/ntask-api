module.exports = app => {

    app.listen(app.get('port'), () => {
        console.log(`NTask API - Listen on port 3000`)
    })

}
