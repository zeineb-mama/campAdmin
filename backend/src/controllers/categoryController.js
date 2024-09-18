const Categorie = require('../models/category')
const Product = require('../models/product')

const registerCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Categorie.findOne({ where: { name } })
        if (category) return res.status(400).json({ msg: "This category already exists." })

        const newCategory = await Categorie.create({ name });
        res.status(201).json(newCategory);
    } catch (err) {
        return res.status(500).json({ msg: "err.message" })
    }
}

// @desc    Fetch all order
// @route   GET /api/order
// @access  Public
const getCategory = async (req, res) => {
    try {
        const newCategory = await Categorie.findAll()
        res.json(newCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: `something went wrong` })
    }
}

const getCategorieById = async (req, res) => {
    try {
        const { id } = req.params;
        const newCategory = await Categorie.findByPk(id)
        if (Categorie)
            res.json(newCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: `something went wrong` })
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Categorie.destroy({ where: { id: id } })
        if (result) {
            console.log("Removed");
            res.json({ success: true, message: "Category removed successfully" });
        } else {
            res.status(404).json({ success: false, message: "Category not found" });
        }
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the category" });
    }
}

const updateCategory = async (req, res) => {
    const { id, name } = req.body;
    try {
        const category = await Categorie.findByPk(id);
        if (category) {
            category.name = name;
            await category.save();
            res.json({ success: true, message: "Category updated successfully", category });
        } else {
            res.status(404).json({ success: false, message: "Category not found" });
        }
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the category" });
    }
}

module.exports = { registerCategory, getCategory, getCategorieById, deleteCategory, updateCategory }