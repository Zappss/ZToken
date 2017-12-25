import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const MainAction = ({sale,accounts,bidHandler}) => {

  if(!sale){
    return <div>Loading ...</div>
  }

  return(
    <Jumbotron className="text-center">
      <h1 className="display-3">Z Project</h1>
      <p className="">Changing the future of the internet using the power of Blockchain</p>
      <p className="lead">
         <Button size="lg" color="primary" onClick={bidHandler}>Buy Tokens</Button>
      </p>

      <Button size="sm" color="secondary" > More buying options</Button>
    </Jumbotron>
  )

}

export default MainAction;
