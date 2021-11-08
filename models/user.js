module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            charset: 'utf8',
            colate: 'utf8_general_ci', //한글 저장
        }
    );

    User.associate = (db) => {
        db.User.belongsToMany(db.Item, { through: 'Like', as: 'Liked' });
    };

    return User;
};
