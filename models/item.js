module.exports = (sequelize, DataTypes) => {
	const Item = sequelize.define(
		'Item',
		{
			itemId: {
				type: DataTypes.STRING(),
				allowNull: false,
				unique: true,
			},
			itemName: {
				type: DataTypes.STRING(),
				allowNull: false,
			},
			brandName: {
				type: DataTypes.STRING(),
			},
			itemLink: {
				type: DataTypes.STRING(),
			},

			// 원래금액
			strikeOutPrice: {
				type: DataTypes.STRING(),
			},
			// 노출금액
			displayPrice: {
				type: DataTypes.STRING(),
			},

			isAdultItem: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			charset: 'utf8',
			colate: 'utf8_general_ci',
		}
	);

	Item.associate = (db) => {
		db.Item.hasMany(db.ItemImage, { sourceKey: 'itemId', foreignKey: 'itemId' });
		db.Item.belongsToMany(db.User, { as: 'ClipUser', through: 'Clips', foreignKey: 'itemId', sourceKey: 'itemId' });
		db.Item.belongsTo(db.ModuleStore, { targetKey: 'storeId', foreignKey: 'moduleStoreId' });
	};

	return Item;
};
