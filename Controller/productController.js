import Products from "../Model/Products.js";

async function handleAddProduct(req,res){
    try {
        //extract the data from request body
const {title,description,category,price,discountPercentage,rating,stock,brand,thumbnail,images}=req.body;

if(!title || !description || !category || !price || !discountPercentage || !rating || !stock || !brand || !thumbnail || images.length<0){
    return res.status(400).json({error:"Please enter All the fields title,description,category,price,discountPercentage,rating,stock,brand,thumbnail,images"})
}
        /**
         * Create a Product
         * pass the data extracted from req.body
         * */ 
        const product=new Products({
            title,
            description,
            category,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            thumbnail,
            images
        })
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
        if(!product){
            return res.status(404).json({error:"Not Products Found"})
        }
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

async function handleUpdateProduct(req,res){
    try {
        //extract the product id from url
        const id=req.params.id;

        //extract the body from req
        const data=req.body;
    

        /**
         * Find the product by its id
         * Check for the product exist in database or not
         * And update the record in database;
         */
        const product =await Products.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        })
        if(!product){
            return res.status(404).json({error:"Product is not found"})
        }
        res.status(200).json(product);        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
    
}

async function handleDeleteProduct(req,res){
     try {
        //extract the product id from url
        const id=req.params.id;

        /**
         * Find the product by its id
         * Check for the product exist in database or not
         * And delete the product from database;
         */
        const product =await Products.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({error:"Product is not found"})
        }
        res.status(200).json({product,message:"Product Deleted Successfully"});        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
    
}


export {handleAddProduct,handleGetAllProducts,handleGetProduct,handleUpdateProduct,handleDeleteProduct}