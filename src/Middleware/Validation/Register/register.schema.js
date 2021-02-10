const joi = require('@hapi/joi');

const schema = {
    regUsers: joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
        name: joi.string().max(100).required(),
        role:joi.string().valid("admin", "candidate", "company").required(),
    })
}

module.exports = schema;