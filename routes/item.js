const express = require('express');

const { Item, ItemImage } = require('../models');

const router = express.Router();

router.get('/:itemId', async (req, res, next) => {
	console.log('item');
	console.log(req.params);
	try {
		const item = await Item.findOne({
			where: { itemId: req.params.itemId },
		});

		if (!item) {
			return res.status(404).status('cannot get item');
		}

		const imageItem = await Item.findOne({
			where: { itemId: item.itemId },
			include: [{ model: ItemImage }],
		});

		const result = {
			res_code: '200',
			res_status: 'success',
			data: imageItem,
		};

		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.patch('/clipped', async (req, res) => {
	console.log('clipped');
	console.log(req.query);
	try {
		const { itemId, userId } = req.query;
		const item = await Item.findOne({
			where: { itemId },
		});
		if (!item) {
			return res.status(404).status('cannot get item');
		}
		await item.addClipUser(userId);
		return res.status(200).json({ res_code: '200', res_status: 'clipped success', itemId, userId });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete('/unclipped', async (req, res) => {
	console.log('unclipped');
	console.log(req);
	try {
		const { itemId, userId } = req.query;
		const item = await Item.findOne({
			where: { itemId },
		});

		console.log(item);
		if (!item) {
			return res.status(404).status('cannot get item');
		}
		await item.removeClipUser(userId);
		return res.status(200).json({ res_code: '200', res_status: 'clipped delete success', itemId, userId });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
