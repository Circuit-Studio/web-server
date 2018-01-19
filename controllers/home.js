// Let's just work with this for now
const utils = require('./utils')


module.exports = (app) => {
    // Home Page
    app.get('/', (req, res) => {
        let bodytype = utils.checkLog("home", req.user)
        res.render("home", {bodytype, user: req.user})
    })


}
