const imageRouter = require('express').Router();



imageRouter.post('/', function (req, res) {
    const { pathname } = url.parse(req.url, true)
    res.redirect(`http://localhost:8000${pathname}`)
});





module.exports = imageRouter;