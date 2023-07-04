const express = require ('express');
const loginRoutes = require('./src/login/routes')



const app = express();
const port = 1005;



app.use(express.json());

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Method','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
})
 
app.use('/api', loginRoutes);

 



  



app.listen(port, () => console.log(`app listen on port ${port}`));

