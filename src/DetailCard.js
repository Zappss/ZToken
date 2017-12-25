import React from 'react';
import { Card, CardHeader, CardTitle, CardText, Row, Col } from 'reactstrap';

const DetailCard = ({title, text}) => {
  return (
    <Card body>
      <CardTitle size="lg">{title}</CardTitle>
      <CardText>{text}</CardText>
    </Card>
  );
};

export default DetailCard;
