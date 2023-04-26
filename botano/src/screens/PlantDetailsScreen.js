import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Image, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listPlantDetails } from '../actions/plantActions';

const PlantDetailsScreen = () => {
  const { _id } = useParams();

  const dispatch = useDispatch();
  const plantDetails = useSelector((state) => state.plantDetails);
  const { loading, error, plant } = plantDetails;

  useEffect(() => {
    dispatch(listPlantDetails(_id));
  }, [dispatch, _id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>;
  }

  if (!plant) {
    return <Message variant='danger'>Plant not found</Message>;
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={plant.image} alt={plant.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{`${plant.name}`}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{`${plant.description}`}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{`${plant.location}`}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{`${plant.local_Area}`}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Season:</Col>
                  <Col>
                    <strong>{`${plant.season}`}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlantDetailsScreen;