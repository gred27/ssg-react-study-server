'use strict';

const itemJSON = require('../items.json');
const imageJSON = require('../images.json');

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        console.log('start');
        const itemId = await queryInterface.bulkInsert(
            'Items',
            itemJSON.map((v) => {
                return { ...v, createdAt: new Date(), updatedAt: new Date() };
            }),
            { returning: ['item_id'] }
        );

        console.log(itemId);

        await queryInterface.bulkInsert(
            'ItemImages',
            imageJSON.map((v) => {
                return { ...v, createdAt, updatedAt };
            }),
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Items', null, {});
        await queryInterface.bulkDelete('ItemImages', null, {});
    },
};
