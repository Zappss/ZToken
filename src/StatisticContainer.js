import React from 'react';
import { Container, CardGroup, CardDeck } from 'reactstrap';
import DetailCard from './DetailCard';

const StatisticContainer = ({saleData}) => {

  if(!saleData){
    return <div>Fetching Blockchain for information...</div>
  }

  return(
    <div>
      <Container>
        <CardDeck>
          <DetailCard text="Current Price" title={saleData.currentPrice + " ETH / Token"} />
          <DetailCard text="Latest Price" title={saleData.currentPrice + saleData.decreaseRate} />
          <DetailCard text="Latest Price" title={saleData.currentPrice + saleData.decreaseRate} />
          <DetailCard text="Cap Reached" title={"0%"} />
          <DetailCard text="Time Remaining" title={"99h"} />
        </CardDeck>
      </Container>
    </div>
  )

}

export default StatisticContainer;
