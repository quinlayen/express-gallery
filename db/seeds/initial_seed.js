

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photo').del()
    .then(function () {
      // Inserts seed entries
      return knex('photo').insert([
        { author: 'Unknown', link: 'https://www.scubadiving.com/sites/scubadiving.com/files/styles/1000_1x_/public/import/2013/files/_images/201304/caves6.jpg?itok=dwi60nE7', description: 'Ordo Cave, Russia'},
        { author: 'Expert Vagabond', link: 'https://photos.smugmug.com/Travel/Mexico/i-HjnsLdr/1/XL/mexico-cavern-diving-dos-ojos-XL.jpg', description: 'Dos Ojos Cave, Yukatan, Mexico'},
        { author: 'Barcroft Media', link: 'https://us-east.manta.joyent.com/condenast/public/cnt-services/production/2014/07/31/53da9eeadcd5888e145c1014_piccaninnie-ponds-australia.jpg', description: 'Piccaninnie Ponds, Australia'},
        { author: 'Mark Long', link: 'http://belizedivingservices.net/wp-content/uploads/2015/09/Giant-Cave-Caye-Caulker-Belize-3-1024x502.jpg', description: 'Giant Cave, Belize'}
      ]);
    });
};
