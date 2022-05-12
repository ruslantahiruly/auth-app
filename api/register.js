import express from 'express';
const app = require('express')();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post(
  '/',
  body('name').exists(),
  body('email').isEmail(),
  body('password').isLength({ min: 4 }),
  async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные'
      });
    }

    const {name, email, password} = req.body;

    const users = (await require('axios').get('http://127.0.0.1:3000/users.json')).data;
    const user = users.find(item => item.email === email);

    if (user) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' });
    }

    // Код добавления пользователя в базу данных

    res.status(201).json({ message: 'Пользователь создан' });

  } catch (err) {
    res.status(500).json({ message: 'Произошла ошибка, попробуте снова' });
  }
});

module.exports = app;