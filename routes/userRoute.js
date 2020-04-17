'use strict';
// userRoute
const cors = require('cors');
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/hack', (req,res)=> {
  res.send(req.body.search);
});

router.post('/',[
    body('name','Min 3 chars, requires').isLength({min: 3}),
    body('email', 'Not a email address').isEmail(),
    body('password', 'One special mark, one capital letter required').matches('?=.*[A-Z]).{8,}'),

], userController.user_post); /*upload.single('user'), (req,res) => {
  console.log('tiedosto: ', req.file);
  userController.user_post(req,res);
});*/

router.put('/', userController.user_put); /*(req, res) => {
  res.send('With this endpoint you can edit users');
});*/

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete users');
});


module.exports = router;