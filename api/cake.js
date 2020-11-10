const express = require('express');
const router = express.Router();
const cakeService = require('../service/cake')

const cakeValidation = (req, res, next) => {
    const idParam = req.params.id;
    if(idParam) {
        req.params.id = idParam.toString().toLowerCase().split(' ').join('-');
    }

    const cakeModel = req.body;
    if(Object.keys(cakeModel).length !== 0) {
        console.log('has cake model', cakeModel);
        if(cakeModel.name && cakeModel.price !== undefined && cakeModel.flavor) {
            next();
        } else {
            res.status(400).json({error: 'You must include a "name", "price" and "flavor" property'})
        }
    }
    next();
}

router.get('/', cakeValidation, async (req, res) => {
    const cakes = await cakeService.getAll();
    res.json(cakes);
});
router.get('/:id', cakeValidation, async (req, res) => {
    const id = req.params.id;
    const cake = await cakeService.get(id);
    if(cake) {
        res.json(cake);
    } else {
        res.status(404).json({error:'Cake not found'});
    }
});

router.post('/', cakeValidation, async (req, res) => {
    const model = req.body;
    
    if(model.name) { 
        const key = model.name.toString().toLowerCase().split(' ').join('-');
        const cake = await cakeService.get(key);
        if(cake) {
            res.status(400).json({error: `duplicated cake key: ${key}`});
        } else {
            const createdCake = await cakeService.create(key, model);
            res.json(createdCake);
        }
    } else {
        res.status(400).json({error:'You need to include at least a "name" property'});
    }
});

router.delete('/:id', cakeValidation, async (req, res) => {
    const id = req.params.id;

    const cakeRes = await cakeService.remove(id);
    if(cakeRes) {
        res.json({message: 'success'});
    } else {
        res.status(404).json({error: 'Cake not found'})
    }
});

router.patch('/:id', cakeValidation, async (req, res) => {
    const id = req.params.id;
    const cake = await cakeService.get(id);
    if(cake) { 
        const model = req.body;
        const updatedCake = await cakeService.update(id, model);
        res.json(updatedCake);
    } else {
        res.status(404).json({error:'Cake not found'});
    }

});

module.exports = router;