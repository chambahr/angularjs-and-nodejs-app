import Product from "../model/Product.js";



// Create a new product
export const createProduct = async (req, res) => {
    try {
      const product = new Product(req.body);
  
      // Validate product details
      const validationErrors = product.validateSync();
      if (validationErrors) {
        const errors = Object.values(validationErrors.errors).map((error) => error.message);
        return res.status(400).json({ errors });
      }
  
      await product.save();
  
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update product details
        Object.assign(product, req.body);

        // Validate product details
        const validationErrors = product.validateSync();
        if (validationErrors) {
            const errors = Object.values(validationErrors.errors).map((error) => error.message);
            return res.status(400).json({ errors });
        }

        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Read all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

// Read a specific product
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
        return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Delete a product
export const deleteProduct =  async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
        return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};