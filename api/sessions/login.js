import express from 'express';
const app = require('express')();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post(
  '/',
  body('email').isEmail(),
  body('password').exists(),
  async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные'
      });
    }

    const {email, password} = req.body;

    const users = (await require('axios').get('http://127.0.0.1:3000/users.json')).data;
    const user = users.find(item => item.email === email);

    if (!users.find(item => item.email === email)) {
      return res.status(400).json({ message: 'Неверно введены email и (или) пароль' });
    }

    if (!users.find(item => item.password === password)) {
      return res.status(400).json({ message: 'Неверно введены email и (или) пароль' });
    }

    const token = user.token;

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: 'Произошла ошибка, попробуте снова' });
  }
});

module.exports = app;