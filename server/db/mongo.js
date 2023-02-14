var mongoose = require('mongoose');

function connect() {
    const host = process.env.MONGO_DB_HOST ?? "localhost"
    const port = process.env.MONGO_DB_PORT ?? "27017"
    const dbName = process.env.MONGO_DB_NAME ?? "bridgerameanapp"

    var url = `mongodb://${host}:${port}/${dbName}`
    mongoose.connect(url, { keepAlive: true, keepAliveInitialDelay: 300000 });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("Mongo DB connected");
    });
}

module.exports = connect;


