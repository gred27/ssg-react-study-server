const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');
const itemsRouter = require('./routes/items');
const storeRouter = require('./routes/moduleStore');

const db = require('./models');

const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');

const swaggerSpec = yamljs.load('./swagger.yaml');

const app = express();
db.sequelize
	.sync()
	.then(() => {
		console.log('db connected');
	})
	.catch(console.error);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/item', itemRouter);
app.use('/api/items', itemsRouter);
app.use('/api/stores', storeRouter);

app.listen(3065, () => {
	console.log('Study API Server Start on port 3065');
});
