const express = require('express');

const { Item, ItemImage } = require('../models');
const router = express.Router();

router.get('/:item_id', async (req, res, next) => {
    console.log('item')
    console.log(req.body);
    try {
        const item = await Item.findOne({
            where: { item_id: req.params.item_id },
        });

        if (!item) {
            return res.status(404).status('cannot get item');
        }

        const imageItem = await Item.findOne({
            where: { item_id: Item.item_id },
            include: [{ model: ItemImage }],
        });

        res.status(201).json(imageItem);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
