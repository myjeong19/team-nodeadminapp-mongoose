const express = require('express');
const router = express.Router();

const userList = [];

router.get('/', async (req, res) => {
  res.render('member/member');
});

router.get('/list', async (req, res) => {
  res.render('member/list', { userList });
});

router.get('/create', async (req, res) => {
  res.render('member/create');
});

router.post('/create', async (req, res) => {
  res.redirect('list');
});

router.get('/modify/:id', async (req, res) => {
  const userId = req.params.id;
  const user = userList[userId];
  res.render('member/modify', { user });
});

router.post('/modify/:id', async (req, res) => {
  res.redirect('/member/list');
});

router.get('/delete', async (req, res) => {
  res.redirect('list');
});

module.exports = router;
