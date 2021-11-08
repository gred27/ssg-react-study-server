'use strict';

const faker = require('faker');
const fs = require('fs');
const dummydata = require('./duumy.json');

const items = [];
const images = [];

const makeItems = () => {
    dummydata.itemList.map((v) => {
        const item = {
            item_id: v.itemId,
            item_name: v.itemNm,

            brand_name: v.brandNm,
            item_link: v.itemLnkd,

            // 원래금액
            strike_out_price: v.strikeOutPrc,
            // 노출금액
            display_price: v.displayPrc,

            is_adult_item: v.adultItemAddImgYn === 'Y',
        };

        items.push(item);

        const tempImages = v.itemImgUrlList.map((url) => {
            return {
                item_id: v.itemId,
                src: faker.image.food(480, 480),
            };
        });

        images.push(...tempImages);
    });
};

makeItems();
console.log(items.length);
console.log(images.length);

const itemsJSON = JSON.stringify(items);
const imagesJSON = JSON.stringify(images);

console.log(itemsJSON);

fs.writeFileSync('./items.json', itemsJSON);
fs.writeFileSync('./images.json', imagesJSON);
