import React from 'react';
import { Container } from 'reactstrap';
import StatisctsCard from './StatisctsCard';

const StatisticContainer = ({saleData}) => {

  if(!saleData){
    return <div>Fetching Blockchain for information...</div>
  }

  return(
    <div>
      <Container>
        Graph goes Here
      </Container>
      <StatisctsCard />
    </div>
  )

}

export default StatisticContainer;
