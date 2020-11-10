const express = require('express');
const router = express.Router();
const cakeService = require('../service/cake')

router.get('/', async (req, res) => {
    const cakes = await cakeService.getAll();
    res.json(cakes);
});
router.get('/:id', async (req, res) => {
    const idParam = req.params.id;
    const id = idParam.toString().toLowerCase().split(' ').join('-');
    const cake = await cakeService.get(id);
    if(cake) {
        res.json(cake);
    }
    res.status(404).send();
});

router.post('/', async (req, res) => {
    const model = req.body;
    
    if(model.name) { 
        const key = model.name.toString().toLowerCase().split(' ').join('-');
        const cake = await cakeService.get(key);
        if(cake) {
            console.log(`duplicated cake key`, key);
            res.status(400).send();
        } else {
            console.log(cakeService)
            const createdCake = await cakeService.create(key, model);
            res.json(createdCake);
        }
    }
    res.status(400).send();
});

router.delete('/:id', async (req, res) => {
    const idParam = req.params.id;
    const id = idParam.toString().toLowerCase().split(' ').join('-');

    const cakeRes = await cakeService.remove(id);
    if(cakeRes) {
        res.json("success")
    }
    res.status(404).send();
});

router.patch('/:id', async (req, res) => {
    const idParam = req.params.id;
    const id = idParam.toString().toLowerCase().split(' ').join('-');
    const cake = await cakeService.get(id);
    if(cake) { 
        const model = req.body;
        const updatedCake = await cakeService.update(id, model);
        res.json(updatedCake);
    } else {
        res.status(404).send();
    }

});

module.exports = router;