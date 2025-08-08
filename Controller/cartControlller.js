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

    /*Initialize a cart if it is Empty  */
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

    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleUpdateQuantity(req, res) {
  try {
    //extract the product_id
    const product_id = req.params.id;

    //Extract the product_id and quantity
    const { quantity } = req.body;

    //Check for the valid product_id and quantity
    if (!product_id || !quantity || quantity < 1) {
      return res.status(400).json({ error: "Invalid Product ID or Quantiy" });
    }

    /*Retreive the CartList
     *Assign to a cart
     */
    const cartList = await Cart.find();
    const cart = cartList[0];

    // Check for the product id is correct or not
    const existingProduct = cart.items.find(
      (item) => item.product.toString() === product_id
    );
    if (!existingProduct) {
      return res.status(404).json({ error: "Product is not found" });
    }

    /**
     * Extract the product using product id present in database;
     * Need stock value to check the quantity is not greater than stock
     */
    const existingProductData = await Products.findById(
      existingProduct.product.toString()
    );

    if (existingProductData.stock < quantity) {
      return res.status(400).json({ error: "Not enough Stock are availabe" });
    }

    //Updat the quantity
    existingProduct.quantity = quantity;

    //save in the database
    await cart.save();

    res.status(200).json({ cart, message: "Updated successfully" });
  } catch (error) {
    
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleRemoveProduct(req, res) {
  try {

    //extract the item id
    const item_id = req.params.id;

    /*Retreive the CartList
     *Assign to a cart
     *extract the items  and assign it to variable
     */
    const cartList = await Cart.find();
    const cart = cartList[0];
    const items = cart.items;
   

    //Check for the item is exist in cart or not
    const isItem = items.findIndex((item) => item.id === item_id);
    if (isItem === -1) {
      return res.status(400).json({ error: "product not in cart" });
    }

    /**
     * Update the items in cart
     * Save in database
     */
    items.splice(isItem, 1);
    await cart.save();

    
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleCartItems(req,res) {
  try {
    const cartList=await Cart.find();
    res.status(200).json({carts:cartList[0].items})
    
  } catch (error) {
       res.status(500).json({ error: "Internal Server Error" });
  }
  
}

export { handleAddToCart, handleUpdateQuantity, handleRemoveProduct,handleCartItems };
