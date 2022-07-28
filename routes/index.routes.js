const router = require("express").Router()

router.use('/', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/comic', require('./comic.routes'))
router.use('/upload', require('./upload.services'))

module.exports = router