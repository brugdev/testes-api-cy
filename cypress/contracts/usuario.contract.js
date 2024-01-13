const Joi = require ('joi')

const userSchema = Joi.object({//ok
    quantidade: Joi.number(), //ok
    usuarios: Joi.array().items({//ok
        nome: Joi.string(),//ok
        email: Joi.string(),//ok
        password: Joi.string(),//ok
        administrador: Joi.string(),//ok
        _id: Joi.string()//ok
    })
})
export default userSchema;