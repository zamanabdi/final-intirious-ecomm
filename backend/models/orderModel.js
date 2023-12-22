import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "users",
    },
    orderItems : [{
        name : {
            type : String,
            required : true
        },
        qty : {
            type : Number,
        required : true,        
    },
     image : {
        type : String,
        required : true
    },
    price : {
        type : Number,
    required : true,        
},
product : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product",
    required : true,        
},
    }],
    shippingAddress : 
        {
            address : {
                type : String,
                required : true

            },
            postalCode : {
                type : String,
                required : true

            },
            country : {
                type : String,
                required : true

            },
            city : {
                type : String,
                required : true

            },
            


        },
        paymentMethod : {
            type : String,
            required : true,
        },
        itemsPrice : {
            type : Number,
            required : true,
            default : 0,
        },
        taxPrice: {
            type : Number,
            required : true,
            default : 0,

        },
        shippingPrice : {
            type : Number,
            required : true,
            default : 0,

        },
        totalPrice : {
            type : Number,
            required : true,
            default : 0
            
        },
        totallPrice : {
            type : Number,
            required : true,
            default : 0
            
        },
        
        isPaid : {
            type : Boolean,
            required : true,
            default : false,
        },
        paidAt : {
            type : Date
        },
        isDelivered : {
            type : Boolean,
            required : true,
            default : false,
        }
        ,
        deliveredAt : {
           type : Date

        },
        paymentOrderId : {
            type: String,
            unique: true
        },
        paymentData : {
            type: JSON
        }, 
}, {
    timestamps : true,
})

const Order = mongoose.model("orders", orderSchema);

export default Order;