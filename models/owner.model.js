const Joi = require('joi');

exports.OwnerSchema = function (mongoose) {
    const mongooseOwner = new mongoose.Schema({
        username: String,
        userPassword: String,
    });

    return  mongoose.model(process.env.MONGOOSE_OWNERS_COLLECTION, mongooseOwner);
}

exports.joiOwner = Joi.object({
    username: Joi.string(),
    userPassword: Joi.string()
})
