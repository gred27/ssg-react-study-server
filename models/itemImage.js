module.exports = (sequelize, DataTypes) => {
    const ItemImage = sequelize.define(
        'ItemImage',
        {
            src: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            charset: 'utf8',
            colate: 'utf8_general_ci', //한글 저장
        }
    );
    ItemImage.associate = (db) => {
        db.ItemImage.belongsTo(db.Item, { foreignKey: 'item_id' });
    };
    return ItemImage;
};
