const express = require('express');

const { Item, ItemImage, ModuleStore } = require('../models');
const router = express.Router();

router.get('/:store_path', async (req, res, next) => {
    console.log('stores');
    console.log(req.body);
    try {
        const page = req.query.page ?? 1;
        let offset = 0;
        if (page > 1) {
            offset = 8 * (page - 1);
        }

        const stores = await ModuleStore.findOne({
            where: { store_path: req.params.store_path },
        });

        if (!stores) {
            return res.status(404).status('cannot get store data').send({
                res_code: '404',
                res_status: 'failed',
            });
        }

        const storeItems = await ModuleStore.findOne({
            where: { id: stores.id },
            include: [{ model: Item, offset, limit: 8, include: [{ model: ItemImage, separate: true }] }],
        });

        console.debug(storeItems.Items.length);
        const result = {
            res_code: '200',
            res_status: 'success',
            data: storeItems,
        };
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
