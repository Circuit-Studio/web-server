// Let's just work with this for now?

module.exports = (app) => {
    // Home Page
    app.get('/', (req, res) => {
        res.render("home", {})
    })


}
