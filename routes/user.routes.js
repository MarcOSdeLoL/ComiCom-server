const router = require("express").Router()

const { isAuthenticated } = require("../middlewares/jwt.middleware")
const User = require("../models/User.model")

//ALL USERS
router.get('/allUsers', (req, res, next) => {

    User
        .find()
        .then(users => res.json(users))
        .catch(error => next(new Error(error)))
})

//USER DETAILS
router.get('/:user_id/details', isAuthenticated, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate('favComics')
        .then(user => res.json(user))
        .catch(error => next(new Error(error)))
})

//EDIT USER
// router.put('/:user_id/edit', (req, res, next) => {

//     const { username, email, password, avatar, description } = req.body

//     const { user_id } = req.params

//     User
//         .findByIdAndUpdate(user_id, { username, email, password, avatar, description })
//         .then(() => res.status(200))
//         .catch(error => console.log(error))
// })

//DELETE USER
// router.delete('/:user_id/delete', (req, res, next) => {

//     const { user_id } = req.params

//     User
//         .findByIdAndDelete(user_id)
//         .then(() => res.status(200))
//         .catch(error => next(new Error(error)))
// })

// ADD TO MY FAVOURITES
router.put('/:comic_id/favComics', isAuthenticated, (req, res, next) => {

    const { _id: user_id } = req.payload
    const { comic_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favComics: comic_id } })
        .then(() => res.json())
        .catch(error => next(new Error(error)))
})

//REMOVE FROM MY FAVOURITES
router.put(`/:comic_id/RemoveFavComic`, isAuthenticated, (req, res, next) => {

    const { _id: user_id } = req.payload
    const { comic_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { favComics: comic_id } })
        .then(() => res.json())
        .catch(error => next(new Error(error)))
})



// READ MY FAVOURITES
router.get('/my-favComics', isAuthenticated, (req, res, next) => {

    const { _id: user_id } = req.payload

    User
        .findById(user_id)
        .populate('favComics')
        .then(user => res.json(user.favComics))
        .catch(error => next(new Error(error)))
})

module.exports = router
