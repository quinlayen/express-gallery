

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photo').del()
    .then(function () {
      // Inserts seed entries
      return knex('photo').insert([
        { author: 'Meow', link: 'http://www.meowhole.com/wp-content/uploads/2016/10/Cat-Meme-Ladies.jpg', description: 'This cat has a "HUGE" tail'},
        { author: 'Alkeida', link: 'http://www.engrish.com/wp-content/uploads//2018/03/bomb-car-rent.jpg', description: 'Guaranteed to last at least 2 times'},
        { author: 'Mr. Turtle', link: 'http://crazyhyena.com/imagebank/g/faster-dude-trying-birds-fly-photo.jpg', description: 'slowpoke'}
      ]);
    });
};
