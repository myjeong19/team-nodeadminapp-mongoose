const express = require('express');
const router = express.Router();

const channelMember = [
  {
    channel_msg_id: '0',
    member_id: '1',
    nick_name: '고추참치',
    member_type_code: '1',
    last_contact_date: '2023-12-20',
    last_out_date: '2023-12-20',
    connection_id: 'Red Pepper Tuna Can With Rice',
    ip_address: '1111.1111.1111.11',
    edit_date: new Date(),
    edit_member_id: '1',
  },
];

router.get('/list', async (req, res) => {
  res.render('message/list', { channelMember });
});
router.get('/create', async (req, res) => {
  res.render('message/create');
});
router.post('/create', async (req, res) => {
  res.redirect('list');
});

router.get('/modify/:id', async (req, res) => {
  const index = req.params.id;
  const member = channelMember[index];
  res.render('/modify', { member });
});

router.post('/modify/:id', async (req, res) => {
  res.redirect('list');
});

router.get('/delete', async (req, res) => {
  res.redirect('list');
});

module.exports = router;
