const express = require('express');
const https = require('https');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { sslOptions, dbConnect } = require('./config');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const PORT = process.env.PORT || 9000;
const ENV = process.env.ENV || 'production';

const app = express();

mongoose.Promise = Promise;

if (mongoose.connection.readyState){
    mongoose.createConnection(dbConnect, (err) => {
        if (err) return console.log('Unable to connect to DB:', err.message);

        console.log('Connected to DB | Multiple');
    });
} else {
    mongoose.connect(dbConnect, (err) => {
        if (err) return console.log('Unable to connect to DB:', err.message);

        console.log('Connected to DB | First');
    });
}

app.use(express.static(path.resolve(__dirname, 'client', 'dist')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

authRoutes(app);
apiRoutes(app);
routes(app);

switch(ENV){
    case 'production':
        https.createServer(sslOptions, app).listen(443, () => {
            console.log('HTTPS server running on PORT:443');
        });
        break;
    case 'livedev':
        exports.app = app;
        break;
    default:
        app.listen(PORT, () => {
            console.log('Server running on PORT: ' + PORT);
        });
}
