import express from 'express';
const app = require('express')();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  try {
    const users = (await require('axios').get('http://127.0.0.1:3000/users.json')).data;

    res.json(users);
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуте снова' });
  }
});

app.put('/', async (req, res) => {
  try {
    // Код обновления данных пользователя в базе данных


    res.json({ message: 'Данные пользователя обновлены' });
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуте снова' });
  }
});

app.delete('/', async (req, res) => {
  try {
    // Код обновления данных пользователя в базе данных


    res.json({ message: 'Данные пользователя удалены' });
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуте снова' });
  }
});

module.exports = app;