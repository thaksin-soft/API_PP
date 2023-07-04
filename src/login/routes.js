const { Router } = require('express');

const controller = require('./controller')

const router = Router();
 
router.post('/posts',verifyToken, controller.postda);

router.post('/adduser', controller.addUser);
router.post('/login', controller.checkUser);


router.post('/calltruck',verifyToken, controller.CallTruck); 
router.post('/call', controller.calltest);
router.post('/calltrucklistitem',verifyToken, controller.callListItemCallTruck);
router.post('/acceptcalltruck',verifyToken,controller.acceptcalltruck);
router.post('/listcalltruckaccepted',verifyToken, controller.listBillheaderAccepted);
router.post('/showitemcalltruckdetailforcheck',verifyToken,controller.showDetailItemCalltruck);
router.post('/caculatebilltotal',verifyToken, controller.updateCallTruckBillDetail);
router.post('/confirmcheckcalltruck',verifyToken, controller.confirmCheckItemdone);
router.post('/showcalltrucklistforpay',verifyToken,controller.showListcalltruckforpayment);
router.post('/showcalltruckbilldetailforpay',verifyToken,controller.showListdetailcalltruckforpayment);
router.post('/paymentcalltruk', verifyToken ,controller.paymentcalltruckbyrider);
router.post('/showlistcallitemnoaccept',verifyToken,controller.showlistcallitemfrombranch);
router.post('/showlistcallitemdetail',verifyToken,controller.showlistcallitemdetail);
router.post('/acceptcallitem', verifyToken, controller.acceptcalitem);
router.post('/showinvoicecallaccept',verifyToken,controller.showbillinvoicecallitemacceptridder);
router.post('/showdetailitemcall',verifyToken,controller.showdetailitemcall);
router.post('/caculatecheckcallitem',verifyToken,controller.updatebillcallitemdetail);
router.post('/confirmcheckcallitem',verifyToken,controller.confirmcheckcallitem);
router.post('/paycashitemcall',verifyToken,controller.paycashitemcall);
router.post('/showacceptitemdetaillist',verifyToken,controller.showcalitemlistDetail);
router.post('/showlistcallitemprepay',verifyToken,controller.showListCallItemPrepay);
router.post('/locatecalltruck',verifyToken,controller.showCallTruckLocation);
router.post('/listbill',verifyToken,controller.billlistforReprint);
router.post('/listbillprint',verifyToken,controller.detailbillPrint);
router.post('/cancelacceptcalltruck', verifyToken, controller.cancel_call_truck);
router.post('/cancelacceptcallitem', verifyToken, controller.cancel_call_item);

router.post('/materialTypeList', verifyToken, controller.mt_list_dropdown);
router.post('/productlist', verifyToken, controller.product_list_dropdown);

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

module.exports = router;
