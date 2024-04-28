// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/db');
const categoriesRoutes = require('./src/routes/categoriesRoutes');
const itemsRoutes = require('./src/routes/itemsRoutes');
const transactionsRoutes = require('./src/routes/transactionsRoutes');
const cors = require('cors')

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

// Sync database
sequelize.sync()
    .then(() => console.log('Database terhubung'))
    .catch(err => console.error('Gagal terhubung ke database:', err));

// Route for registration and login
app.use('/categories', categoriesRoutes);
app.use('/items', itemsRoutes);
app.use('/transactions', transactionsRoutes);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
