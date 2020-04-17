'use strict';
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');

const users = userModel.users;

const user_list_get = async (req, res) => {
  const users = await userModel.getUserList();
  res.json(users);
};

const user_get = async (req, res) => {
  console.log('user id parameter', req.params);
  const user = await userModel.getUser(req.params.id); //users.filter(user => user.id === req.params.id).pop();
  delete user.password;
  res.json(user);
};

const user_post = async (req, res) => {
  console.log('data from form', req.body);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()});
  }
  const inUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await userModel.insertUser(inUser);
    console.log('inserted', user);
    res.send(`added user: ${user.insertId}`);
  } catch (e) {
    console.error('problem with user_post in userController', e);
    res.status(500).send(`database insert error: ${e.message}`);
  }
  //res.send('With this endpoint you can add users');
};

const user_put = async (req,res) => {
  console.log('user_put', req.body);
  const upUser = await userModel.updateUser(req.body);
  console.log('user_put result from db', upUser);
  res.status(204).send();
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_put,
};
