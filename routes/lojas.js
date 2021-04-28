// importando a biblioteca 'express'
const express = require('express');
// importando as funcionalidades do 'express' para trabalho com rotas
const router = express.Router();
// importando o 'model' do usuário
const Loja = require('../models/loja');
// importando a biblioteca 'bcrypt'
const bcrypt = require('bcrypt');
// importando a biblioteca 'jsonwebtoken'
const jwt = require('jsonwebtoken');
// importando o middleware de autenticação
const auth = require('../middlewares/auth');
// importando a biblioteca para configurações
const config = require('../config/config');

// criando o endpoint para listar lojas
router.get('/', async (req,res) => {
    try {
        // criando um objeto para receber as usuários
        const lojas = await Loja.find({});
        return res.send(lojas);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos usuários!' });
    }
});

// criando o endpoint para salvar 
router.post('/create', async (req,res) => {
    const { nome, site, phone, email, password } = req.body;
    console.log(`${nome} - ${site} - ${phone} - ${email} - ${password}`);
    // testando se todos os campos obrigatórios foram informados
    if (!nome || !site || !email ) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        
        if (await Loja.findOne({ nome, site }))
            return res.send({ error: 'site já cadastrado! '});
        // se o usuário ainda nao for cadastrado
        const loja = await Loja.create(req.body);
        return res.status(201).send({ loja, token: createlojaToken(loja.id) });
    }
    catch (err) {
        return res.send({ error: `Erro ao gravar o usuário: ${err}`})
    }
});

// criando o endpoint para alterar usuário
router.put('/update/:id', auth,  async (req,res) => {
    const { nome, site} = req.body;
    if (!nome || !site) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // verificando se o usuário/email já está cadastrado
        if (await Loja.findOne({ site, email }))
            return res.send({ error: 'Loja já cadastrada! '});
        // se o usuário ainda nao for cadastrado
        const loja = await Loja.findByIdAndUpdate(req.params.id, req.body);
        // realizando uma nova busca após a alteração para obter o usuário com as alterações
        const lojaChanged = await Loja.findById(req.params.id);
        // impedindo o retorno da senha
        lojaChanged.password = undefined;
        return res.status(201).send({ lojaChanged, token: createlojaToken(lojaChanged.id) });
    }
    catch (err) {
        return res.send({ error: `Erro ao atualizar o usuário: ${err}`})
    }     
});

// criando o endpoint para apagar usuário
router.delete('/delete/:id', auth, async (req,res) => {
    try {
        await Loja.findByIdAndDelete(req.params.id);
        return res.send({ error: 'Usuário removido com sucesso!' });
    }
    catch (err) {
        return res.send({ error: 'Erro ao remover usuário!' });
    }     
});

// exportando o módulo
module.exports = router;