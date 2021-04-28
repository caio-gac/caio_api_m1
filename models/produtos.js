// importando/instanciando a biblioteca 'mongoose'
const mongoose = require('mongoose');
// instanciando o 'schema' do mongoose para a criação dos models
const Schema = mongoose.Schema;
// importando a biblioteca 'bcrypt'
const bcrypt = require('bcrypt');

const lojaSchema = new Schema({
    nome: { type: String, required: true },
    tipo: { type: String},
    marca: { type: String, required: true },
    proço: { type: Number, required: true},
    foto: { type: String }
});

// criando uma nova função para preparar os campos
userSchema.pre('save', async function (next) {
    let user = this;

    
});

module.exports = mongoose.model('User', userSchema);

