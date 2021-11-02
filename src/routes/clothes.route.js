'use strict';

const express = require('express');
const { Clothes } = require('../models/index');
const clothesRouter = express.Router();

clothesRouter.get('/clothes', getClothes);
clothesRouter.get('/clothes/:id', getOneClothe);
clothesRouter.post('/clothes', createClothe);
clothesRouter.put('/clothes/:id', updateClothe);
clothesRouter.delete('/clothes/:id', deleteClothe);


async function getClothes(req, res) {
    const allClothes = await Clothes.findAll();
    res.status(200).json(allClothes);
}

async function getOneClothe(req, res) {
    const id = parseInt(req.params.id);
    const oneClothe = await Clothes.findOne({ where: { id: id } });
    res.status(200).json(oneClothe);
}

async function createClothe(req, res) {
    const obj = req.body;
    let newClothe = await Clothes.create(obj);
    res.status(201).json(newClothe);
}

async function updateClothe(req, res) {
    const id = parseInt(req.params.id);
    const obj = req.body;
    let foundClothe = await Clothes.findOne({ where: { id: id } });
    let updatedClothe = await foundClothe.update(obj);
    res.status(201).json(updatedClothe);
}

async function deleteClothe(req, res) {
    const id = parseInt(req.params.id);
    const deletedClothe = await Clothes.destroy({ where: { id } });
    res.status(204).json(deletedClothe);
}

module.exports = clothesRouter;
