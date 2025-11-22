const express = require('express');
const cors = require('cors');
const prisma = require('./config/database');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const stockRoutes = require('./routes/stock.routes');
const statsRoutes = require('./routes/stats.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => {
    res.send('StockMaster API is running');
});

// Export for Vercel
module.exports = app;

// Server Start
if (require.main === module) {
    const startServer = async () => {
        try {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        } catch (error) {
            console.error('Error starting server:', error);
        }
    };

    startServer();
}
