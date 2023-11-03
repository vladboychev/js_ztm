const express = require("express");
const poductsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new")
const { requireTitle, requirePrice } = require("./validators");

const router = express.Router();

router.get("/admin/products", (req, res) => {

});

router.get("/admin/products/new", (req, res) => {
    res.send(productsNewTemplate({}));
});

module.exports = router;