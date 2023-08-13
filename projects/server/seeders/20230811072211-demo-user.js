'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //  await queryInterface.bulkInsert('Users', [{
    //   fullName: 'Afdal',
    //   email : "afdalmaulanaaa@gmail.com",
    //   username : "Afdalmaulana26",
    //   password : "$2a$10$nYAuCtBRY0rF7rfcU58ME.yeRBy.NWzJP7eVyC08vo/VFLwzP0PnS",
    //   birthday : new Date(1998, 7, 26),
    //   roleId : 2,
    //   daySalary : 150000,
    //   baseSalary : 3000000,
    //   isLogin : false,
    //   income : 0,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //  }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
