const express = require('express');
const app = express();
const port = 4000;
const userRouter = require(__dirname + '/routes/userRouter').userRouter;
const bookRouter = require(__dirname + '/routes/bookRouter').bookRouter;

app.listen(port, console.log('up on the ' + port));


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api', userRouter);
app.use('/api', bookRouter);
