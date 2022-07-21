const router = require('express').Router()

const Comic = require('../models/Comic.model')

// const uploaderConfig = require('./../config/uploader.config')


// CREATE COMIC
router.post('/create', (req, res, next) => {

    const { user_id: owner } = req.payload
    
    Comic
        .create({ ...req.body, owner })
        .then(() => res.status(200))
        .catch(error => res.status(500).json(error))
})


// COMICS LIST

router.get('/allComics', (req, res, next) => {

    Comic
        .find()
        .then(comics => res.json(comics))
        .catch(error => res.status(500).json(error))

})


// MY COMICS
router.get('/my-comics', (req, res, next) => {

    const { user_id: owner } = req.payload

    Comic
        .find({ owner })
        .then(comics => res.json(comics))
        .catch(error => res.status(500).json(error))
})


// COMIC DETAILS
router.get('/:comic_id/details', (req, res, next) => {

    const { comic_id } = req.params

    Comic
        .findById(comic_id)
        .then(comic => res.json(comic))
        .catch(error => res.status(500).json(error))
})


// COMIC EDITION
router.put('/:comic_id/edit', (req, res, next) => {

    const { title, number, pages, cover } = req.body
    const { comic_id } = req.params

    Comic
        .findByIdAndUpdate(comic_id, { title, number, pages, cover })
        .then(() => res.status(200))
        .catch(error => res.status(500).json(error))
})


// DELETE COMIC
router.delete('/:comic_id/delete', (req, res, next) => {

    const { comic_id } = req.params

    Comic
        .findByIdAndDelete(comic_id)
        .then(() => res.status(200))
        .catch(error => res.status(500).json(error))
})


//CHANGE A COMIC FOR SALE
router.put('/:comic_id/forSale', (req, res, next) => {

    const { forSale } = req.body
    const { comic_id } = req.params

    Comic
        .findByIdAndUpdate(comic_id, { forSale })
        .then(() => res.status(200))
        .catch(error => res.status(500).json(error))

})


//BUY A COMIC
//Change the owner-PENDIENTE DE COMPLETAR
router.put('/:comic_id/exchange', (req, res, next) => {

    const { comic_id } = req.params
    const { owner } = req.body

    Comic
        .findByIdAndUpdate(comic_id, { forSale: false, owner })
        .then(() => res.status(200))
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