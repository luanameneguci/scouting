const express = require('express');

const app = express();
const port = 3000;

// Simple router
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/about', (req, res) => {
    res.send('About Page');
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});