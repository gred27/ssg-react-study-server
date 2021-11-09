module.exports = (sequelize, DataTypes) => {
    const ModuleStore = sequelize.define(
        'ModuleStore',
        {
            store_id: {
                type: DataTypes.STRING(),
                allowNull: false,
                unique: true,
            },
            store_name: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
        },
        {
            charset: 'utf8',
            colate: 'utf8_general_ci',
        }
    );

    ModuleStore.associate = (db) => {
        db.ModuleStore.hasMany(db.Item, { foreignKey: 'module_store_id' });
    };

    return ModuleStore;
};
