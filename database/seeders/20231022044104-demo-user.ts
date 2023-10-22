'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface:any, Sequelize:any) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      fullName: 'Sadiq Ibrahim',
      email: 'sadiq@mahindra.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

  },

  async down (queryInterface:any, Sequelize:any) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
