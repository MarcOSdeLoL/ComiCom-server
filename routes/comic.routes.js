const router = require('express').Router()

const { isAuthenticated } = require('../middlewares/jwt.middleware')

const Comic = require('../models/Comic.model')

// const uploaderConfig = require('./../config/uploader.config')


// CREATE COMIC
router.post('/create', isAuthenticated, (req, res, next) => {

    const { _id: owner } = req.payload

    Comic
        .create({ ...req.body, owner })
        .then(() => res.status(200).json('created'))
        .catch(error => res.status(500).json(error))
})


// COMICS LIST
router.get('/allComics', isAuthenticated, (req, res, next) => {

    Comic
        .find()
        .then(comics => res.json(comics))
        .catch(error => res.status(500).json(error))
})


// MY COMICS
router.get('/my-comics', isAuthenticated, (req, res, next) => {

    const { _id: owner } = req.payload

    Comic
        .find({ owner })
        .then(comics => res.json(comics))
        .catch(error => res.status(500).json(error))
})


// COMIC DETAILS
router.get('/:comic_id/details', isAuthenticated, (req, res, next) => {

    const { comic_id } = req.params
    Comic
        .findById(comic_id)
        .then(comic => res.json(comic))
        .catch(error => res.status(500).json(error))
})


// COMIC EDITION
router.put('/:comic_id/edit', isAuthenticated, (req, res, next) => {

    const { title, number, pages, cover } = req.body

    const { comic_id } = req.params

    Comic
        .findByIdAndUpdate(comic_id, { title, number, pages, cover })
        .then(() => res.status(200).json('ok'))
        .catch(error => res.status(500).json(error))
})


// DELETE COMIC
router.delete('/:comic_id/delete', isAuthenticated, (req, res, next) => {

    const { comic_id } = req.params

    Comic
        .findByIdAndDelete(comic_id)
        .then(() => res.status(200).json('ok'))
        .catch(error => res.status(500).json(error))
})


//CHANGE A COMIC INTO ADOPTABLE
router.put('/:comic_id/setAvailable', isAuthenticated, (req, res, next) => {

    const { comic_id } = req.params
    Comic
        .findByIdAndUpdate(comic_id, { forSale: true })
        .then(() => res.status(200).json())
        .catch(error => res.status(500).json(error))

})

//CHANGE A COMIC INTO UNADOPTABLE
router.put('/:comic_id/setUnavailable', isAuthenticated, (req, res, next) => {

    const { comic_id } = req.params

    console.log('---------------------------------------------', req.params)


    Comic
        .findByIdAndUpdate(comic_id, { forSale: false })
        .then(() => res.status(200).json())
        .catch(error => res.status(500).json(error))

})


//ADOPT A COMIC
//Change the owner-PENDIENTE DE COMPLETAR
router.put('/:comic_id/adopt', isAuthenticated, (req, res, next) => {

    const { comic_id } = req.params
    const { _id: owner } = req.payload

    Comic
        .findByIdAndUpdate(comic_id, { forSale: false, owner })
        .then(() => res.status(200).json('ok'))
        .catch(error => res.status(500).json(error))
})


module.exports = router



//allComics ALTERNATIVE
// router.get('/allComics', (req, res, next) => {

//     Comic
//         .find()
//         // .populate('owner')
//         .then(comics => {

//             let allInfo = comics.map(comic => {

//                 const ownerID = comic.owner._id.toString()

//                 return {
//                     isOwner: ownerID === req.session.currentUser._id,
//                     comic
//                 }
//             })

//             return allInfo
//         })
//         // .then(allInfo => res.send(comics))
//         .catch(error => next(new Error(error)))
// })


//ALLCOMICS ALTERNATIVE
// router.get('/:comic_id/details', (req, res, next) => {

//     const { comic_id } = req.params

//     const promises = [
//         Comic.findById(comic_id).populate('owner'),
//     //     Comment.find({ Comic: comic_id })
//     //         .populate('owner')
//     // ]

//     Promise
//         .all(promises)
//         .then(([comicData, commentsData]) => {
//             res.render('recipes/details-recipe', { comicData, commentsData })
//         })
//         .catch(error => next(new Error(error)))
// })