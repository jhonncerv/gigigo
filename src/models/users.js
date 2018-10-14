const mongoose = require('mongoose')

const mongo_username = process.env.MONGO_USER
const mongo_pass = process.env.MONGO_PASSWORD

mongoose.connect(
    `mongodb+srv://${mongo_username}:${mongo_pass}@clustergigigo-aixxq.mongodb.net/gigigo?retryWrites=true`,
    {
        useNewUrlParser: true
    }
)

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema)