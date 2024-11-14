const express = require('express');
const { getAllUsers, Login, createUser, getAllUsersByEmail,getChatList, updateUserByEmail, updateUserPasswordByEmail, getUserData, getMessages, getChats } = require('../controllers/ResellerController');
const channelController = require("../controllers/ChannelController");


const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));


router.get('/usersdata',getAllUsers);

router.post('/login',Login);

router.post('/register',createUser);

router.get('/usersdata/:email',getAllUsersByEmail);
router.post('/getuserdata',getUserData)


router.put('/updateuser/:email',updateUserByEmail);
router.get('/getmessages',getMessages);
router.get('/chatlist',getChatList)
router.get('/chats',getChats)


router.put('/updatepassword/:email',updateUserPasswordByEmail);


// channel



// router.post("/create-channel", verifyUserToken, channelController.createChannel);
router.get("/get-channels/:userId",channelController.getUserChannels);
router.get("/get-channel-messages/:channelId", channelController.getChannelMessages);


module.exports = router;
