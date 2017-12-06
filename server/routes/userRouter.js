const Router = require('express').Router;
const userRouter = Router();
const jsonParser = require('body-parser').json();
const knex = require(__dirname + '/../../knex').knex;
module.exports = {
    userRouter: userRouter
};


userRouter.post('/users', jsonParser, (req, res, next)=>{
    const name = req.body.name;
    const email_address = req.body.email_address;

    knex('users')
.select(knex.raw('1=1'))
.where('email_address', email_address)
.first()
.then((exists) => {
    if (exists) {
        // TODO: create 400 error when email address already in system
    }
    const insertUser = { name, email_address };
    return knex('users')
    .insert(insertUser, '*');
})
.then((rows) => {
    const user = rows[0];
    res.send(user);
})
.catch((err) => next(err));
});


userRouter.get('/users', (req, res, next) => {

    knex('users')
    .then((rows) => res.send(rows))
    .catch((err) =>
    console.log(err)
    .then((err)=>{
        next(err);
    })

);
});

userRouter.get('/users/:id', (req, res, next) => {
    knex.select('*')
    .from('users')
    .where({id: req.params.id})
    .then((rows) => res.send(rows))
    .catch((err)=>{
        console.log(err);
    })
    .then((err)=>{
        next(err);
    });

});


userRouter.get('/users/:email', (req, res, next) => {
    knex.select('*')
    .from('users')
    .where({email_address: req.params.email})
    .then((rows) => res.send(rows))
    .catch((err)=>{
        console.log(err);
    })
    .then((err)=>{
        next(err);
    });

});


userRouter.put('/users/:id', jsonParser, (req, res, next)=>{


  knex('users')
  .where('id', '=', req.params.id)
  .update({
    name:req.body.name
  })
  .then(()=>{
    res.send()
  })
  // .catch(error=>console.log(error))
  // next(error)
})


userRouter.delete('/users/:id', (req, res, next)=>{

   knex('users')
  .where('id', '=', req.params.id)
  .del()
  .then((rows)=>{
      const user = rows[0];

      res.send(user);
  })
  .catch((err)=>{
      next(err);
  });
});
