const express = require('express');
const router = express.Router();

/**
 * Memory storage for the cakes
 */
const cakeList = new Map();

router.get('/', (req, res) => {
    res.json(Array.from(cakeList.values()));
});
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const id = idParam.toString().toLowerCase().split(' ').join('-');

    if(cakeList.has(id)) {
        res.json(cakeList.get(id));
    }
    res.status(404).send();
    
});

router.post('/', (req, res) => {
    const model = req.body;
    
    if(model.name) { 
        const key = model.name.toString().toLowerCase().split(' ').join('-');
        if(cakeList.has(key)) {
            console.log(`duplicated cake key`, key);
            res.status(400).send();
        } else {
            cakeList.set(key, model);
        }
    }

    res.json(model);
});

router.delete('/:id', (req, res) => {
    const idParam = req.params.id;
    const id = idParam.toString().toLowerCase().split(' ').join('-');

    if(cakeList.has(id)) {
        cakeList.delete(id);
        res.json('success');
    }
    res.status(404).send();
});

router.patch('/:id', (req, res) => {
    const idParam = req.params.id;
    const id = idParam.toString().toLowerCase().split(' ').join('-');

    if(cakeList.has(id)) { 
        const model = req.body;
        cakeList.set(id, model);
        res.json(model);
    } else {
        res.status(404).send();
    }

});

module.exports = router;