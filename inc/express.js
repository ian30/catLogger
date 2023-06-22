const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/cats', (req, res) => {
    const catData = req.body;

    // Append the cat data to the text file
    fs.appendFile('catData.txt', JSON.stringify(catData) + '\n', (err) => {
        if (err) {
            console.error('Error saving cat data:', err);
            res.status(500).json({ error: 'Error saving cat data' });
        } else {
            console.log('Cat data saved:', catData);
            res.json({ message: 'Cat data saved successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
