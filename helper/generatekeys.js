const crypto = require("crypto");

const itemkey = crypto.randomBytes(32).toString('hex');

 

module.exports = {
   
    itemkey, 
};