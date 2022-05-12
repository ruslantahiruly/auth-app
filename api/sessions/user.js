import express from 'express';
const app = require('express')();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  try {
    let token = req.headers.cookie.split(';').find(
      c => c.trim().startsWith('token')
    );

    if (token) {
      token = token.split('=')[1];
    }
    
    const users = (await require('axios').get('http://127.0.0.1:3000/users.json')).data;
    const user = users.find(item => item.token == token);

    res.json({user});
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуте снова' });
  }
});

module.exports = app;