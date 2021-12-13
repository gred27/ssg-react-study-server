const express = require('express');

const { Item, ItemImage } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
	console.log('items');
	console.log(req.body);
	try {
		const items = await Item.findAll({
			include: [{ model: ItemImage }],
		});

		if (!items) {
			return res.status(404).status('cannot get items').send({
				res_code: '404',
				res_status: 'failed',
			});
		}

		const result = {
			res_code: '200',
			res_status: 'success',
			itemList: items,
		};
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;
