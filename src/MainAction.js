import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const MainAction = ({sale,accounts,bidHandler}) => {

  if(!sale){
    return <div>Loading ...</div>
  }

  return(
    <Jumbotron>
      <h1 className="display-3">Z Project</h1>
      <p className="">Changing the future of business using the power of Blockchain</p>
      <Button size="lg" color="primary" onClick={bidHandler}>Buy Tokens</Button>
    </Jumbotron>
  )

}

export default MainAction;
