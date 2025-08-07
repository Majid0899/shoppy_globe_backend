import mongoose from "mongoose";


const cartItem=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    }
})

const cartSchema = new mongoose.Schema({
  items: [cartItem],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cart=mongoose.model('cart',cartSchema);

export default Cart;