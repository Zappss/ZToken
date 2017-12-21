import React from 'react';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';

const StatisctsCard = (props) => {
  return (
    <Row>
      <Col sm="6">
        <Card body>
          <CardTitle>75 %</CardTitle>
          <CardText>raised</CardText>
        </Card>
      </Col>
      <Col sm="6">
        <Card body>
          <CardTitle>27:43</CardTitle>
          <CardText>Hours remaining</CardText>
        </Card>
      </Col>
    </Row>
  );
};

export default StatisctsCard;
