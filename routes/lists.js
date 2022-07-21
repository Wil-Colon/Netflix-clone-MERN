const router = require('express').Router();
const List = require('../models/List');
const verify = require('../verifyToken');

//CREATE LIST OF MOVIES
//ADMIN ONLY
//POST api/lists/

router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);

        try {
            const savedList = await newList.save();

            res.status(201).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You are not allowed!');
    }
});

//DElETE LIST BY ID
//ADMIN ONLY
//POST api/lists/:id

router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);

            res.status(201).json('The list has been deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You are not allowed!');
    }
});

//UPDATE LIST
//ADMIN ONLY
//PUT api/lists/:id

router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedList = await List.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You are not allowed!');
    }
});

//GET WHOLE LIST (used for main login page)
//Get /api/lists/ (accepts 2 queries type, genre)

router.get('/', verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } },
                ]);
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ]);
            }
        } else {
            list = await List.aggregate([{ $sample: { size: 10 } }]);
        }

        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET List by list ID
//Get /api/lists/:id

router.get('/:id', verify, async (req, res) => {
    try {
        const list = await List.findById(req.params.id);

        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
