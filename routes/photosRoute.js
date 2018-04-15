const express = require('express');
const router = express.Router();


// get a list of all photos
router.get('/', (req,res)=>{
    res.send('sanity check')
})

// get photo by photo_id
router.get('/gallery/:id', (req,res)=>{
    res.send('sanity check')
})

// show form field to create a new photo
router.get('/gallery/new', (req,res)=>{
    res.send('sanity check')
})

// create a new photo
router.post('/gallery', (req,res)=>{
    res.send('sanity check')
})

// show a form field to edit an existing photo
router.get('/gallery/:id/edit', (req,res)=>{
    res.send('sanity check')
})

// edit an existing photo
router.put('/gallery/:id', (req,res)=>{
    res.send('sanity check')
})

// delete an exisiting photo
router.delete('/gallery/:id', (req,res)=>{
    res.send('sanity check')
})

module.exports = router;