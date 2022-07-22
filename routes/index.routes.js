const router = require("express").Router()

router.use('/', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/comic', require('./comic.routes'))

module.exports = router