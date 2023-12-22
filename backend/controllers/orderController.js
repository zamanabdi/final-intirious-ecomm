import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Razorpay from "razorpay";

// @desc fetch all products
// @routes GET api/products
// @acceess - private

const addOrderItems = asyncHandler( async(req ,res) => {
    const {
        orderItems  ,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice,
    } = req.body;
    if(orderItems && orderItems.length ===0){
        res.status(400);
        throw new Error('No order items');

    }else{
        console.log("here")
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const order = new Order({
            orderItems : orderItems.map((x)=> ({
                ...x,
                product : x._id,
                _id : undefined

            }) ),
            user : req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const payment_capture = 1;
        const currency = "INR";
        const options = {
            amount: totalPrice*100,
            currency,
            receipt: "jevil257@gmail.com"
        };
        const response = await razorpay.orders.create(options);
        order.paymentOrderId = response.id;
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
   });

    // @desc get logged in user orders
// @routes GET api/orders/myorders
// @acceess - private

const getMyOrders  = asyncHandler( async(req ,res) => {
    const orders = await Order.find({user : req.user._id});
    res.status(200).json(orders);

    });
      // @desc get order by ID
// @routes GET api/orders/:id
// @acceess - private

// const getOrderById  = asyncHandler( async(req ,res) => {
//     const order = await Order.findById(req.params.id);

//     if(order){
//         res.status(200).json(order);
//     }else{
//         throw new Error('Order not found');
//     }
//     // res.send("hello")

//     });

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
  
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });
      // @desc update order to paid
// @routes GET api/orders/pay
// @acceess - private/admin

const updateOrderToPaid  = async(req ,res) => {
    console.log('update order to paid');
    const { id,paymentData } = req.body;
    const order = await Order.findOneAndUpdate({
        paymentOrderId: paymentData.razorpay_order_id
    },{
        $set : {
            paymentData: paymentData,
            isPaid: true,
        },
        $currentDate : {
            paidAt: true
        }
    })
    res.status(200).send(order);
    };
     // @desc update order to delivered
// @routes GET api/orders/:id/deliver
// @acceess - private/admin

const updateOrderToDelivered = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updateOrder = await order.save();

        res.status(200).json(updateOrder);
    }else {
        res.status(404);
        throw new Error("order not found");
    }
});

  // @desc get all orders
// @routes GET api/orders
// @acceess - Private/Admin

const getOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
});


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid
}
    