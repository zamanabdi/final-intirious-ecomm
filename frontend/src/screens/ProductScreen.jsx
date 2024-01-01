import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Rating from "../components/rating/Rating";
import Loader from "../components/Loader/Loader";
import "./productScreen.css";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,useGetProductsQuery
} from "../slices/productsApiSlice";
import Message from "../message/Message";
import { useState } from "react";
import { Row, Form, Col, ListGroup, Button } from "react-bootstrap";
import { addToCart } from "../slices/cartSlice";
import Product from "../components/product/Product";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  const { data:products, isLoading:relatedLoading, error:relatedError } = useGetProductsQuery();

  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate("/cart");
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    
    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  useEffect(() => {
 console.log(product)
  },[product])

  return (
    <>
      <div className="productScreen-wrapper">
        {/* btn-wrapper */}
        <div className="btn-wrapper">
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <div className="productScreen-content">
              {/* product image */}
              <div className="productScreen-img">
                <img src={product.image} />
              </div>

              {/* product details */}
              <div className="productScreen-details">
                {/* seller name */}
                <div className="seller-details">
                  <span>Brand:</span> Intirious Design & Collection
                </div>

                {/* product title */}
                <div className="productScreen-title">
                  <h2>{product.name}</h2>
                </div>

                {/* star rating */}
                <div className="productScreen-star">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </div>

                {/* product price */}
                <div className="productScreen-price">
                  &#8377;{product.price}
                </div>

                {/* product status */}
                <div className="productScreen-status">
                  <span>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </span>
                </div>

                {product.countInStock > 0 && (
                  <div style={{display:"flex",alignItems:"center"}}>
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        {" "}
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>{" "}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  </div>
                  
                )}

                {/* product description */}
                <div className="productScreen-desc">{product.description}</div>

                {/* add to cart button */}
                <div className="addCart-btn">
                  <button
                    style={{
                      background: `${product.countInStock === 0 ? "red" : ""}`,
                      color: `${product.countInStock === 0 ? "white" : ""}`,
                    }}
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    {product.countInStock === 0
                      ? "Out of stock"
                      : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>

            <Row className="review">
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {loadingProductReview && <Loader />}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating" className="my-2">
                          <Form.Label>Rating</Form.Label>

                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value="">Select...</option>

                            <option value="1">1 - Poor</option>

                            <option value="2">2 - Fair</option>

                            <option value="3">3 - Good</option>

                            <option value="4">4 - Very Good</option>

                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="comment" className="my-2">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        <Link
                          to="/login"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          Sign in
                        </Link>{" "}
                        to write a review{" "}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>

            <>
        <h1
          style={{
            width: "100%",
            padding: "10px 20px",
            fontFamily: "sans-serif",
          }}
        >
          Related Products
        </h1>
        <div className="home-wrapper">
          {products.filter((item) => {
            return(
              item._id !== product._id && item.category === product.category
            )
          }).map((product) => {
            return <Product product={product} />;
          })}
        </div>
      </>
          </>
        )}
      </div>
    </>
  );
};

export default ProductScreen;
