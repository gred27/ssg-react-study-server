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

        // user
        await queryInterface.bulkInsert('Users', [{ userid: 'test1', password: '1234', createdAt: new Date(), updatedAt: new Date() }]);
        const users = await queryInterface.sequelize.query('SELECT id FROM users;');

        console.log('user', users[0]);

        await queryInterface.bulkInsert('ModuleStores', [
            { store_id: '20', store_name: '테스트매장1', store_path: 'test1', createdAt: new Date(), updatedAt: new Date() },
            { store_id: '30', store_name: '테스트매장2', store_path: 'test2', createdAt: new Date(), updatedAt: new Date() },
        ]);

        const stores = await queryInterface.sequelize.query('SELECT id FROM ModuleStores;');
        console.log('stores', stores[0]);

        await queryInterface.bulkInsert(
            'Items',
            itemJSON.map((v, i) => {
                return { ...v, createdAt: new Date(), updatedAt: new Date(), module_store_id: i % 2 == 0 ? stores[0][0].id : stores[0][1].id };
            })
        );

        const items = await queryInterface.sequelize.query('SELECT id, item_id FROM Items;');
        const itemsMap = new Map(
            items[0].map(({ id, item_id }) => {
                return [item_id, id];
            })
        );

        await queryInterface.bulkInsert(
            'ItemImages',
            imageJSON.map((v) => {
                return { ...v, itemId: itemsMap.get(v.item_id), createdAt, updatedAt };
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
        await queryInterface.bulkDelete('Users', null, {});
        await queryInterface.bulkDelete('Clip', null, {});
        await queryInterface.bulkDelete('ModuleStores', null, {});
    },
};
