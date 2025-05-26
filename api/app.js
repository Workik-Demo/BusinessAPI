const express = require('express');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Book Inventory API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;