const Joi = require('joi');

const scooterSchema = Joi.object({
    position: {
        type: Joi.string(),
        geometry: {
            type: Joi.string(),
            coordinates: Joi.array().items(Joi.number(), Joi.number()),
        },
    },
    properties: {
        whole: Joi.boolean(),
        charging: Joi.boolean(),
        blocked: Joi.boolean(),
        batterywarning: Joi.boolean(),
        batterydepleted: Joi.boolean(),
        rented: Joi.boolean(),
        userid: Joi.number(),
        featureType: Joi.string(),
    },
});

module.exports = {
    scooterSchema,
};
