const router = require('express').Router()

const Comic = require('../models/Comic.model')

// const uploaderConfig = require('./../config/uploader.config')

// CREATE COMIC
router.post('/create', (req, res, next) => {

    const { title, number, pages, cover, forSale } = req.body //????

    // const owner = req.session.currentUser._id

    Comic
        .create({ title, number, pages, cover, forSale })
        .then(() => res.status(200))
        .catch(error => next(new Error(error)))
})


// COMICS LIST

router.get('/allComics', (req, res, next) => {

    Comic
        .find()
        .then(comics => res.json(comics))
        .catch(error => next(new Error(error)))
})


// MY COMICS
router.get('/my-comics', (req, res, next) => {

    const { _id: owner } = 1234

    Comic
        .find({ owner })
        .then(comics => res.json(comics))
        .catch(error => next(new Error(error)))
})


// COMIC DETAILS
router.get('/:comic_id/details', (req, res, next) => {

    const { comic_id } = req.params

    Comic
        .findById(comic_id)
        .then(comic => res.json(comic))
        .catch(error => next(new Error(error)))
})


// COMIC EDITION
router.put('/:comic_id/edit', (req, res, next) => {

    const { title, number, pages, cover } = req.body
    const { comic_id } = req.params

    Comic
        .findByIdAndUpdate(comic_id, { title, number, pages, cover })
        .then(() => res.status(200))
        .catch(error => next(new Error(error)))
})


// DELETE COMIC
router.delete('/:comic_id/delete', (req, res, next) => {

    const { comic_id } = req.params

    Comic
        .findByIdAndDelete(comic_id)
        .then(() => res.status(200))
        .catch(error => next(new Error(error)))
})


//CHANGE A COMIC FOR SALE
router.put('/:comic_id/forSale', (req, res, next) => {

    const { forSale } = req.body
    const { comic_id } = req.params

    Comic
        .findByIdAndUpdate(comic_id, { forSale })
        .then(() => res.status(200))
        .catch(error => next(new Error(error)))
})


//BUY A COMIC
//Change the owner-PENDIENTE DE COMPLETAR
router.put('/:comic_id/exchange', (req, res, next) => {

    const { comic_id } = req.params
    const { owner } = req.body

    Comic
        .findByIdAndUpdate(comic_id, { forSale: false, owner })
        .then(() => res.status(200))
        .catch(error => next(new Error(error)))
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