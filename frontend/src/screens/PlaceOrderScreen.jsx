import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../message/Message";
import Loader from "../components/Loader/Loader";
import { clearCartItems } from "../slices/cartSlice";
import {
  useCreateOrderMutation,
  useOrderPaidMutation,
} from "../slices/ordersApiSlice";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { makePayment } from "../utils/razorPay";
import './placeOrderScreen.css';

const PlaceOrderScreen = () => {
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paid, { isLoading: paidLoading, error: paidError }] =
    useOrderPaidMutation();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      const result = await initializeRazorpay();

      if (!result) {
        alert("Razorpay SDK Failed to load");
      }
      if (res.paymentOrderId) {
        console.log(process.env.REACT_APP_RAZORPAY_KEY);
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          name: "Interious Design and Collection",
          currency: "INR",
          amount: res.totalPrice * 100,
          order_id: res.paymentOrderId,
          image: "/logo.png",
          description: `Interious Design and Collection Order Payment`,
          handler: async function (response) {
            dispatch(clearCartItems());
            const data = { id: res._id, paymentData: response };
            const res1 = await paid(data);
            console.log(res1);
            navigate(`/order/${res._id}`);
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        alert("Something went wrong");
        console.log("Payment Error");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="placeOrder-wrapper">
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>shipping</h2>
              <p>
                <strong>Address : </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {""}
                {cart.shippingAddress.postalCode},{""}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method :</strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>

              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/product/${item._id}`}
                          >
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x {item.price} = &#8377;{item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items :</Col>
                  <Col> &#8377;{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping :</Col>
                  <Col> &#8377;{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax :</Col>
                  <Col> &#8377;{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price :</Col>
                  <Col> &#8377;{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error.data.message}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  {" "}
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
