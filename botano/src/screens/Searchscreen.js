import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Plant from "../components/Plant";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listPlants } from "../actions/plantActions";

const Searchscreen = () => {
  const dispatch = useDispatch();

  const plantList = useSelector((state) => state.plantList);
  const { loading, error, plants } = plantList;

  useEffect(() => {
    dispatch(listPlants());
  }, [dispatch]);

  const handleRightClick = (event) => {
    event.preventDefault();
  };

  return (
    <main onContextMenu={handleRightClick}>
      <div>
        <Form>
          <Row>
            <Col>
              <Form.Control
                style={{ width: 1100 }}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-1"
                aria-label="Search"
              />
            </Col>
            <Col>
              <Button style={{ width: 150, height: 46 }} variant="success">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {plants &&
              plants.map((plant) => (
                <Col key={plant.id} sm={12} md={9} lg={8} xl={3}>
                  <Plant plant={plant} />
                </Col>
              ))}
          </Row>
        )}
      </div>
    </main>
  );
};

export default Searchscreen;
