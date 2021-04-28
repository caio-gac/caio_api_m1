// importando a biblioteca 'express'
const express = require('express');
// importando as funcionalidades do 'express' para trabalho com rotas
const router = express.Router();
// importando o 'model' do usuário
const Produtos = require('../models/produtos');
// importando a biblioteca 'bcrypt'
const bcrypt = require('bcrypt');
// importando a biblioteca 'jsonwebtoken'
const jwt = require('jsonwebtoken');
// importando o middleware de autenticação
const auth = require('../middlewares/auth');
// importando a biblioteca para configurações
const config = require('../config/config');

// criando o endpoint para listar produtos
router.get('/', async (req,res) => {
    try {
        // criando um objeto para receber as usuários
        const produtos = await Produtos.find({});
        return res.send(produtos);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos produtos!' });
    }
});

// criando o endpoint para salvar usuário
router.post('/create', async (req,res) => {
    const { name, tipo, marca, preco, foto } = req.body;
    console.log(`${name} - ${marca} - ${preco}`);
    // testando se todos os campos obrigatórios foram informados
    if (!name || !marca || !preco ) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // verificando se o usuário/email já está cadastrado
        if (await Produtos.findOne({ produtos, email }))
            return res.send({ error: 'Usuário já cadastrado! '});
        // se o usuário ainda nao for cadastrado
        const produtos = await Produtos.create(req.body);
        // impedindo o retorno da senha
        produtos.password = undefined;
        return res.status(201).send({ produtos, token: createprodutosToken(produtos.id) });
    }
    catch (err) {
        return res.send({ error: `Erro ao gravar o usuário: ${err}`})
    }
});

// criando o endpoint para alterar usuário
router.put('/update/:id', auth,  async (req,res) => {
    const { nome, marca} = req.body;
    if (!nome || !marca) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // verificando se o usuário/email já está cadastrado
        if (await Produtos.findOne({ nome, email }))
            return res.send({ error: 'Produtos já cadastrada! '});
        // se o usuário ainda nao for cadastrado
        const produtos = await Produtos.findByIdAndUpdate(req.params.id, req.body);
        // realizando uma nova busca após a alteração para obter o usuário com as alterações
        const produtosChanged = await Produtos.findById(req.params.id);
        // impedindo o retorno da senha
        return res.status(201).send({ produtosChanged, token: createprodutosToken(produtosChanged.id) });
    }
    catch (err) {
        return res.send({ error: `Erro ao atualizar o usuário: ${err}`})
    }     
});

// criando o endpoint para apagar usuário
router.delete('/delete/:id', auth, async (req,res) => {
    try {
        await Produtos.findByIdAndDelete(req.params.id);
        return res.send({ error: 'Usuário removido com sucesso!' });
    }
    catch (err) {
        return res.send({ error: 'Erro ao remover usuário!' });
    }     
});

// exportando o módulo
module.exports = router;