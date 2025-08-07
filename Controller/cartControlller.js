import Cart from "../Model/Cart.js";
import Products from "../Model/Products.js";

async function handleAddToCart(req, res) {
  try {
    //Extract the product_id and quantity
    const { product_id, quantity } = req.body;

    //Check for the valid product_id and quantity
    if (!product_id || !quantity || quantity < 1) {
      return res.status(400).json({ error: "Invalid Product ID or Quantiy" });
    }

    //Check product is available or not
    const product = await Products.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: "Product is not exist !!!" });
    }

    //Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({ error: "Not enough Stock are availabe" });
    }

    /*Initialize a cart if it is Empty */
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    /**
     * Check Item is exist or not
     * yes: increase quantity
     * no:push the item in cart_items
     */
    const existingItem = cart.items.find(
      (item) => item.product.toString() === product_id
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: product_id, quantity });
    }
    

    //save the cart item in database;
     await cart.save();

    return res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {

   
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handleAddToCart };
