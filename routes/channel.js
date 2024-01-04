const express = require('express');
const router = express.Router();

const channelList = [
  {
    channel_id: '0',
    community_id: '0',
    channel_name: '하하호호',
    user_limit: '100',
    channel_img_path:
      'https://images.unsplash.com/photo-1686904950871-36be25be5171?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
    channel_desc: '하하 호호 오늘도 즐겁게 웃어보아요',
    channel_state_code: '1',
    reg_date: '2023-12-19',
    reg_member_id: 'myjeong19',
    edit_date: new Date(),
    edit_member_id: 'myjeong19',
  },

  {
    channel_id: '1',
    community_id: '1',
    channel_name: '정주나 안정주나 늘정주는 정준하',
    user_limit: '150',
    channel_img_path:
      'https://images.unsplash.com/photo-1702529939203-04c666ee2b7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D',
    channel_desc: '쩌리짱',
    channel_state_code: '1',
    reg_date: '2023-12-20',
    reg_member_id: 'myjeong19',
    edit_date: new Date(),
    edit_member_id: 'myjeong19',
  },
];

router.get('/list', async (req, res) => {
  res.render('channel/list', { channelList });
});
router.get('/create', async (req, res) => {
  res.render('channel/create');
});
router.post('/create', async (req, res) => {
  res.redirect('list');
});

router.get('/modify/:id', async (req, res) => {
  res.render('channel/modify');
});

router.post('/modify/:id', async (req, res) => {
  res.redirect('list');
});

router.get('/delete', async (req, res) => {
  res.redirect('list');
});

module.exports = router;
