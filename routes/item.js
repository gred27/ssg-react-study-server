const express = require('express');

const { Item, ItemImage } = require('../models');
const router = express.Router();

router.get('/:item_id', async (req, res, next) => {
    console.log('item')
    console.log(req.params);
    try {
        const item = await Item.findOne({
            where: { item_id: req.params.item_id },
        });

        if (!item) {
            return res.status(404).status('cannot get item');
        }

        const imageItem = await Item.findOne({
            where: { item_id: item.item_id },
            include: [{ model: ItemImage }],
        });

        const result = {
            res_code: '200',
            res_status: 'success',
            item : imageItem
        }

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
