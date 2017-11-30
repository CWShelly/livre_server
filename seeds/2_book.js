exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return knex('books').del()
    .then(function () {
      // Inserts seed entries
        return knex('books').insert([
        {title: 'Test Title', user_id: '1', author:'Test Author', currentlyWith: 'Test Me', ownerEmail: "test@test.com", available: true},


        ]);
    });
};
