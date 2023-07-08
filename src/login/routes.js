const { Router } = require('express');

const controller = require('./controller')

const router = Router();


router.post('/adduser', controller.addUser);
router.post('/login', controller.checkUser);


router.post('/calltruck',verifyToken, controller.CallTruck); 

// function verifyToken(req, res, next) {
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined') {
//       // Split at the space
//       const bearer = bearerHeader.split(' ');
//       // Get token from array
//       const bearerToken = bearer[1];
//       // Set the token
//       req.token = bearerToken;
//       // Next middleware
//       next();
//     } else {
//       // Forbidden
//       res.sendStatus(403);
//     }
  
//  }

module.exports = router;
