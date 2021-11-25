const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [{
      model: Product,
      attributes:["id", "product_name", "price", "stock", "category_id"] 
    }],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"] 
    }],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json(err));
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name})
    .then((categories) => res.status(200).json(categories))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name,
   }, {
    where: {
      id: req.params.id,
    },
  })
    .then((categories) => res.status(200).json(categories))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categories) => res.status(200).json(categories))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
