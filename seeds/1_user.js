
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return knex('users').del()
    .then(function () {
      // Inserts seed entries
        return knex('users').insert([
            {name:'test', email_address:'test@test.com'}

        ]);

    });
};
