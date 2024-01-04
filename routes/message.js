const express = require("express");
const router = express.Router();
var moment = require("moment");

const ChannelMessage = require("../schemas/channelMessage");
const Swal = require("sweetalert2");

const mergeByKey = (baseObj, otherObj) => {
  return Object.keys(baseObj).reduce((result, key) => {
    result[key] = otherObj[key];
    return result;
  }, baseObj);
};

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

  //reduce는 array를 순환하면서 하나의 무언가로 바꾸는 기능
  // [1,2,3,4]를 reduce를 통해 10으로 return할수도 있고
  // {channel_id : '삼성', nick_name : '성원', msg_type_code : ""}를
  //중간에 if문 걸어서 ""인 경우는 제외한 object를 리턴하는 것도 가능.
  //{channel_id : '삼성', nick_name : '성원'}
  //map, filter를 array를 리턴하지만,
  //reduce는 리턴값이 자유로움.

  //이번 경우에는 searchOption이라는 객체에서
  //key array를 통해 접근해서
  //다른 -객체-를 리턴해야하니까 reduce를 사용함.

  //reduce는 Array.reduce( ()=> {}, {})형식임.
  //첫번째 인자는 원소마다 적용할 콜백함수,
  //두번째 인자는 리턴값의 초기설정값.

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
  console.log(channel_msg_id);
  try {
    const msg = await ChannelMessage.findOne({ channel_msg_id });
    if (msg === null) res.send("no channel_msg_id : " + channel_msg_id);
    else res.render("message/modify", { msg });
  } catch (err) {
    console.log("err", err);
    if (channel_msg_id === undefined || channel_msg_id === "")
      res.send("channel_msg_id need! " + err);
    else res.send("error!!! : " + err);
  }
});

router.post("/modify/:channel_msg_id", async (req, res) => {
  var channel_msg_id = req.params.channel_msg_id;

  try {
    const msg = await ChannelMessage.findOne({ channel_msg_id });

    mergedObject = mergeByKey(msg.toJSON(), req.body);
    mergedObject.edit_date = Date.now();
    await ChannelMessage.updateOne({ channel_msg_id }, mergedObject);
    res.redirect("/message/list");
  } catch (err) {
    if (channel_msg_id === undefined || channel_msg_id === "")
      res.send("channel_msg_id need! " + err);
    else res.send("error!!! : " + err);
  }
});

router.get("/delete", async (req, res) => {
  res.redirect("list");
});

//아래의 에러처리 코드는 무조건 router정의가 다 끝난 최하단에 위치해야 함.

//위에서 정의하지 않은 라우터에 대한 모든 요청에 대해서
//Error 객체를 생성하는 아래의 미들웨어를 실행한다.

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//위에서 받은 Error객체를 통해 화면에 처리하는 미들웨어
router.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = router;
