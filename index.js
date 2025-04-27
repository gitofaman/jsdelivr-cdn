var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname, 'src')));

// Optional route for testing
// app.get('/', (req, res) => {
//     res.send('all good');
// });

app.listen(3001, () => {
    console.log('Server started at port 3001');
});
