// importando/instanciando a biblioteca 'mongoose'
const mongoose = require('mongoose');
// instanciando o 'schema' do mongoose para a criação dos models
const Schema = mongoose.Schema;
// importando a biblioteca 'bcrypt'
const bcrypt = require('bcrypt');

// criação do 'schema' para o usuário
const userSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    birthday: { type: String, required: true },
    login: { type: String, required: true, unique: false },
    phone: { type: String, required: false },
    email: { type: String, required: true},
    password: { type: String, required: true },
    dicasenha: { type: String},
    cidade: { type: String},
    estado: { type: String},
});

// criando uma nova função para preparar os campos
userSchema.pre('save', async function (next) {
    let user = this;
    // testando se o campo de senha foi modificado
    if (!user.isModified('password'))
        return next();
    // criando o hash para o campo password
    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

module.exports = mongoose.model('User', userSchema);

