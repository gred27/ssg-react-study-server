const express = require('express');

const { Item, ItemImage } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    console.log('items')
    console.log(req.body);
    try {
        const items = await Item.findAll({
            include: [{ model: ItemImage }],
        });

        if (!items) {
            return res.status(404).status('cannot get items');
        }

        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
