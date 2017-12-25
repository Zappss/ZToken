import React from 'react';
import { Row, Col, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { Form, FormGroup, Label} from 'reactstrap';

const ComplexBid = ({bidHandler}) => {



  return(
  //   <Row>
  //   <Col className="text-center">
  //     <InputGroup>
  //       <Input placeholder="1.00" />
  //       <InputGroupAddon>ETH</InputGroupAddon>
  //     </InputGroup>
  //   </Col>
  //   <Col>
  //     <InputGroup>
  //       <InputGroupAddon>
  //         <Input addon type="checkbox" />
  //       </InputGroupAddon>
  //       <Input placeholder="Reciever address" />
  //     </InputGroup>
  //
  //   </Col>
  // </Row>
  <Form inline>
  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    <Label for="ethamount" className="mr-sm-2">ETH Amount</Label>
    <Input type="number" min="0.01" step="0.01" name="eth" id="ethamount" placeholder="1.4" />
  </FormGroup>
  <Label>You Get X tokens</Label>
  <Button>Submit</Button>
</Form>
  )

}

export default ComplexBid;
