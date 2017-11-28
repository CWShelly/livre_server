

// Update with your config settings.

module.exports = {


   test: {
       client: 'postgresql',
       connection: {
           database: 'livreTest',

       },
       pool: {
           min: 2,
           max: 10
       },
       migrations: {
           directory: './migrations'
       },
       seeds:{
           director: './seeds'
       }

   },

   development: {
       client: 'postgresql',
       connection: {
           database: 'livreDev',

       },
       pool: {
           min: 2,
           max: 10
       },
       migrations: {
           directory: './migrations'
       },
       seeds:{
           director: './seeds'
       }

   }


};
