const Router = require('express').Router;
const bookRouter = Router();
const jsonParser = require('body-parser').json();
const knex = require(__dirname + '/../../knex').knex;
module.exports = {
    bookRouter: bookRouter
};


bookRouter.post('/books', jsonParser, (req, res, next)=>{

    let user_id;
    const title = req.body.title;
    const author = req.body.author;
    const available = req.body.available;
    const ownerEmail = req.body.ownerEmail;
    let insertBook;

    return knex('users')
    .where('email_address', ownerEmail)
    .then((columns)=>{

        var currentlyWith = columns[0].name.toString();
        var user_id = columns[0].id.toString();
        insertBook = { user_id, title, author, available, ownerEmail, currentlyWith };

    })
    .then(()=>{
        knex('books')
           .insert(insertBook, '*')
       .then((rows) => {

           const book = rows[0];
           res.send(book);
       })
       .catch((err) => next(err));
    });
});


bookRouter.get('/books', (req, res, next) => {
    knex('books')
   .then((rows) => res.send(rows))
   .catch((err) =>
   console.log(err)
   .then((err)=>{
       next(err);
   })
);
});


bookRouter.delete('/books/:id', (req, res, next)=>{

   knex('books')
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


bookRouter.get('/books/:id', (req, res, next) => {

   knex.select('*')
   .from('books')
   .where({id: req.params.id})
   .then((rows) => res.send(rows))
   .catch((err)=>{
       console.log(err);
   })
   .then((err)=>{
       next(err);
   });

});

bookRouter.put('/books/:id', jsonParser, (req,res, next)=>{
 let ownerEmail = req.body.ownerEmail;
 let borrowerEmail;
 let user_id;
 let currentlyWith;
 let available;



 if(!req.body.borrowerEmail ){
   // borrowerEmail = ownerEmail

   available = req.body.available

     knex('books')
     .where('id', '=', req.params.id)
     .update({
       title:req.body.title,
       author: req.body.author,
       available: available,
       currentlyWith: currentlyWith
     })
     .then(()=>{

       res.send()
     })
     .catch((err)=>{
       console.log(err);
       next(err)
     })
 }


else if (req.body.borrowerEmail === req.body.ownerEmail) {
   borrowerEmail = req.body.borrowerEmail

 return knex('users')
 .where('email_address', borrowerEmail)
 .then((columns)=>{

   currentlyWith = columns[0].name.toString()

 })
 .catch(error=>console.log(error))
 .then(()=>{

     knex('books')
     .where('id', '=', req.params.id)
     .update({
       title:req.body.title,
       author: req.body.author,
       available: available,
       currentlyWith: currentlyWith
     })
     .then(()=>{

       res.send()
     })
     .catch((err)=>{
       console.log(err);
       next(err)
     })

 })
}

 else{
   borrowerEmail= req.body.borrowerEmail
   available = "False"



   return knex('users')
   .where('email_address', borrowerEmail)
   .then((columns)=>{

     currentlyWith = columns[0].name.toString()

   })
   .catch(error=>console.log(error))
   .then(()=>{
       knex('books')
       .where('id', '=', req.params.id)
       .update({
         title:req.body.title,
         author: req.body.author,
         available: available,
         currentlyWith: currentlyWith
       })
       .then(()=>{

         res.send()
       })
       .catch((err)=>{
         console.log(err);
         next(err)
       })

   })
 }



})
