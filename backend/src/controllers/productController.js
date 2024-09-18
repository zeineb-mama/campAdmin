const Category = require('../models/category');
const { OrderItem, Order } = require('../models/order');
const Product = require('../models/product')


exports.allProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: Category
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.newCollections = async (req, res) => {
    let products = await Product.findAll();
    let arr = products.slice(0).slice(-8);
    console.log("New Collections");
    res.send(arr);
};


exports.popularProduct = async (req, res) => {
    const category = await Category.findOne({ where: { name: 'equipements' } });
    let products = await Product.findAll({ where: { categoryId: category.id } });
    let arr = products.splice(0, 4);
    // console.log("Popular In equipements");
    res.send(arr);
};


exports.relatedProducts = async (req, res) => {
    console.log("Related Products");
    const { categoryId } = req.body;
    const products = await Product.findAll({ where: { categoryId } });
    const arr = products.slice(0, 5);
    res.send(arr);
};

exports.productByCat = async (req, res) => {
    const { categoryName } = req.params;
    try {
        const category = await Category.findOne({ where: { name: categoryName } });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const products = await Product.findAll({ where: { categoryId: category.id } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.addproduct = async (req, res) => {
    const { name, description, new_price, old_price, categoryId } = req.body;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const imageUrl = req.file ? req.file.path : '';

        const product = await Product.create({
            name,
            description,
            image: imageUrl,
            new_price,
            old_price,
            categoryId: category.id
        });

        res.json(product);
        console.log(product.image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, old_price, new_price, categoryId } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ success: false, message: "Category not found" });
            }

            let imageUrl = product.image;
            if (req.file) {
                imageUrl = req.file ? req.file.path : '';
            }
            product.name = name;
            product.old_price = old_price;
            product.new_price = new_price;
            product.categoryId = category.id;
            product.image = imageUrl;

            await product.save();
            res.json({ success: true, message: "Product updated successfully", product });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the product" });
    }
};


exports.removeproduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const associatedOrderItems = await OrderItem.findAll({
            where: { productId },
            include: [{ model: Order }]
        });

        if (associatedOrderItems.length > 0) {
            const associatedOrders = associatedOrderItems.map(item => item.Order.id);

            return res.status(400).json({
                status: 'error',
                message: `Cannot delete this product as it is associated with the following orders: ${associatedOrders.join(', ')}`,
                associatedOrders
            });
        }

        await Product.destroy({
            where: { id: productId }
        });

        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while trying to delete the product.',
        });
    }
};
