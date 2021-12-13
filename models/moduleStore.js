module.exports = (sequelize, DataTypes) => {
	const ModuleStore = sequelize.define(
		'ModuleStore',
		{
			storeId: {
				type: DataTypes.STRING(),
				allowNull: false,
				unique: true,
			},
			storeName: {
				type: DataTypes.STRING(),
				allowNull: false,
			},
			storePath: {
				type: DataTypes.STRING(),
				allowNull: false,
				unique: true,
			},
		},
		{
			charset: 'utf8',
			colate: 'utf8_general_ci',
		}
	);

	ModuleStore.associate = (db) => {
		db.ModuleStore.hasMany(db.Item, { sourceKey: 'storeId', foreignKey: 'moduleStoreId' });
	};

	return ModuleStore;
};
