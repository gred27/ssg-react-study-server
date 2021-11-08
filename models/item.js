module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
        'Item',
        {
            item_id: {
                type: DataTypes.STRING(),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            item_name: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            brand_name: {
                type: DataTypes.STRING(),
            },
            item_link: {
                type: DataTypes.STRING(),
            },

            // 원래금액
            strike_out_price: {
                type: DataTypes.STRING(),
            },
            // 노출금액
            display_price: {
                type: DataTypes.STRING(),
            },

            is_adult_item: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            charset: 'utf8',
            colate: 'utf8_general_ci',
        }
    );

    Item.associate = (db) => {
        db.Item.hasMany(db.ItemImage, { foreignKey: 'item_id' });
    };

    return Item;
};