import mongoose from 'mongoose';

// const { MongoClient } = require("mongodb");
// const uri = "mongodb://0.0.0.0:27017/simple-crud";
// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// });

const BookSchema = mongoose.Schema({
    title: String,
    author: String,
    description: String,
}, {
    timestamps: true
});
const Book = mongoose.model('Book', BookSchema);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    useFindAndModify: false,
    // autoIndex: false, // Don't build indexes
    // poolSize: 10, // Maintain up to 10 socket connections
    // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // family: 4 // Use IPv4, skip trying IPv6
};

function connectWithRetry() {
    return mongoose.connect('mongodb://0.0.0.0:27018/simple-crud', options, (err) => {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};

function mongoMigration() {
    connectWithRetry();
    console.log('Mongo connection succesful');
    mongoose.connection.on('open', () => {
        // mongoose.connection.db.dropDatabase();
        Book.create({
            "title": "MongoDB Recipes",
            "author": "Subhashini Chellappan",
            "description": "With Data Modeling and Query Building Strategies"
        }, (err) => {
            if (err) console.error('Failed to create start book', err);
        });
    });
    console.log('Mongo migration succesful');
};

async function getBooks(req, res, next) {
    await Book.find((err, books) => {
        if (err) return next(err);
        res.json(books);
        // res.send(JSON.stringify(books))
    });
};

async function getBookById(req, res, next) {
    await Book.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        res.json(post);
        // res.send(JSON.stringify(post))
    });
};

async function postBook(req, res, next) {
    await Book.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
        // res.send(JSON.stringify(post))
    });
}

async function updateBook(req, res, next) {
    Book.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
        // res.send(JSON.stringify(post))
    });
};

async function deleteBook(req, res, next) {
    Book.findByIdAndRemove(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
        // res.send(JSON.stringify(post))
    });
}

export { mongoMigration, getBooks, getBookById, postBook, updateBook, deleteBook }