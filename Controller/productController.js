import Products from "../Model/Products.js";

async function handleAddProduct(req,res){
    try {
        //extract the data from request body
        const data=req.body;

        /**
         * Create a Product
         * pass the data extracted from req.body
         * */ 
        const product=new Products(data)

        //save the data in database;
        const response=await product.save();

       
        res.status(201).json({response})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }

}

async function handleGetAllProducts(req,res){
    try {
        //get all the products from database;
        const product=await Products.find();
        res.status(200).json({products:product})
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

async function handleGetProduct(req,res) {
    try {
        //extract the id from url
        const id=req.params.id;

        /**
         * Find the product by its id
         * Check for the product exist in database or not
         */
        const product =await Products.findById(id)
        if(!product){
            return res.status(404).json({error:"Product is not found"})
        }
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
    
}


export {handleAddProduct,handleGetAllProducts,handleGetProduct}