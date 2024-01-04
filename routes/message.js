const express = require("express");
const router = express.Router();
var moment = require("moment");

const ChannelMessage = require("../schemas/channelMessage");
const Swal = require("sweetalert2");

router.get("/list", async (req, res) => {
  var searchOption = {
    channel_id: "",
    nick_name: "",
    msg_type_code: "",
  };
  const msgs = await ChannelMessage.find({});

  res.render("message/list", { msgs, searchOption, moment });
});

router.post("/list", async (req, res) => {
  var channel_id = req.body.channel_id;
  var nick_name = req.body.nick_name;
  var msg_type_code = req.body.msg_type_code;

  var searchOption = {
    channel_id,
    nick_name,
    msg_type_code,
  };
  const filteredObject = Object.keys(searchOption).reduce((acc, key) => {
    if (searchOption[key] !== "") {
      acc[key] = searchOption[key];
    }
    return acc;
  }, {});

  const msgs = await ChannelMessage.find(filteredObject);

  console.log("searchOption : ", searchOption);
  console.log("filteredObject : ", filteredObject);
  console.log("post list message : ", msgs);
  res.render("message/list", { msgs, searchOption, moment });
});

router.get("/create", async (req, res) => {
  res.render("message/create");
});
router.post("/create", async (req, res) => {
  var channel_id = req.body.channel_id;
  var member_id = req.body.member_id;
  var nick_name = req.body.nick_name;
  var msg_type_code = req.body.msg_type_code;
  var connection_id = req.body.connection_id;
  var message = req.body.message;
  var ip_address = req.body.ip_address;

  //var top_channel_msg_id = req.body.top_channel_msg_id;
  //var msg_state_code = req.body.msg_state_code;

  var msg = {
    channel_id,
    member_id,
    nick_name,
    msg_type_code,
    connection_id,
    message,
    ip_address,
    top_channel_msg_id: 999,
    msg_state_code: 1,
    msg_date: Date.now(),
    edit_date: Date.now(),
    reg_date: Date.now(),
  };
  await ChannelMessage.create(msg);
  console.log("msg create : ", msg);
  res.redirect("/message/list");
});

router.get("/modify/:channel_msg_id", async (req, res) => {
  const channel_msg_id = req.params.channel_msg_id;
  if (channel_msg_id === undefined) res.send("error");
  else {
    const msg = await ChannelMessage.findOne({ channel_msg_id });

    res.render("message/modify", { msg });
  }
});

router.post("/modify/:channel_msg_id", async (req, res) => {
  var channel_msg_id = req.params.channel_msg_id;
  if (channel_msg_id === undefined) res.send("error!");
  else {
    const msg = await ChannelMessage.findOne({ channel_msg_id });
    msg.channel_id = Number(req.body.channel_id);
    msg.member_id = Number(req.body.member_id);
    msg.nick_name = req.body.nick_name;
    msg.msg_type_code = req.body.msg_type_code;
    msg.message = req.body.message;
    msg.connection_id = req.body.connection_id;
    msg.ip_address = req.body.ip_address;
    msg.msg_state_code = req.body.msg_state_code;

    msg.edit_date = Date.now();

    console.log("modify post message : ", JSON.stringify(msg, null, 2));
    await ChannelMessage.updateOne({ channel_msg_id: channel_msg_id }, msg);
    res.redirect("/message/list");
  }
});

router.get("/delete", async (req, res) => {
  res.redirect("list");
});

module.exports = router;
