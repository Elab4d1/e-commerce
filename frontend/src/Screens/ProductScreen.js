//!----------------Requirement--------------------//
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetails, createProductReview } from "../actions/productActions";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import PageTitle from "../components/PageTitle";

//!------------------Component Part--------------------//

export const ProductScreen = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const listProductDetails = useSelector((state) => state.product);
  const { loading, error, product } = listProductDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { error: errorReview, success: successReview } = productCreateReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successReview) {
      alert("Review submitted successfully");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(productDetails(id));
  }, [id, dispatch, successReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <PageTitle title={"Produit"} />

      <a className="btn btn-dark my-3 rounded" href="/">
        Retourner
      </a>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${Number(product.reviews.length)} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Prix:</Col>
                      <Col>
                        <strong>{product.price} Dhs</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Statut:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? "En stock"
                          : "En rupture de stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantité</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-black rounded"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Ajouter au panier
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="my-4">
            <Col md={6}>
              <h2>Avis</h2>
              {product.reviews.length === 0 && <Message>Aucun avis</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup className="my-2">
                  <h2>Rédiger un commentaire</h2>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => {
                            setRating(e.target.value);
                          }}
                        >
                          <option value="">Sélectionner...</option>
                          <option value="1">1 - Pauvre</option>
                          <option value="2">2 - Équitable</option>
                          <option value="3">3 - Bien</option>
                          <option value="4">4 - Très bien</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Commentaire</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="primary"
                        className="my-2 rounded"
                      >
                        Commenter
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Veuillez vous <Link to="/login">connecter</Link> pour
                      écrire un avis
                    </Message>
                  )}
                </ListGroup>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
