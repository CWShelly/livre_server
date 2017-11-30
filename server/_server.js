const express = require('express');
const app = express();
const userRouter = require(__dirname + '/routes/userRouter').userRouter;
const bookRouter = require(__dirname + '/routes/bookRouter').bookRouter;
const port = 4000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api', userRouter);
app.use('/api', bookRouter);
 

module.exports = exports = function(port, cb){
    return app.listen(port, cb);
};
