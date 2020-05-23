import React, { Component } from "react";
import { Button, Row, Col, Card, Form, FormGroup, Input, Label, CustomInput } from "reactstrap";
import axios from "axios";

export default class AddTransaction extends Component {
  render() {
    let { description, transaction, amount, errors } = this.props.value;
    return (
      <div>
        <div className='card-box card'>
          <div className='card-title'>
            <h4>Submit Transaction</h4>
          </div>
          <Form onSubmit={(e) => this.props.handleSubmit(e)}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for='exampleSelect' className='multiExpLbl required'>
                    Amount
                  </Label>
                  <Input
                    type='tel'
                    pattern='[7-9]{1}[0-9]{4-9}'
                    name='amount'
                    placeholder='Enter the Amount'
                    value={amount}
                    required
                    className='input-text'
                    onChange={(e) => this.props.handleChange(e)}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for='exampleSelect' className='multiExpLbl required'>
                    Desciption
                  </Label>
                  <Input
                    type='text'
                    name='description'
                    placeholder='Enter desciption'
                    value={description}
                    required
                    className='input-text'
                    onChange={(e) => this.props.handleChange(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className='multiExpLbl required'>Select Transaction</Label>
                  <Input
                    type='select'
                    name='transaction'
                    id='transaction'
                    required
                    value={transaction}
                    className='input-text'
                    onChange={(e) => this.props.handleChange(e)}
                  >
                    <option>Select Transaction Type</option>
                    <option>Credit</option>
                    <option>Debit</option>
                  </Input>
                  {<span className='error'>{errors.transaction}</span>}
                </FormGroup>
              </Col>
            </Row>
            <Row className='d-flex justify-content-around'>
              <Button className='sign-btn' type='submit'>
                Submit
              </Button>
            </Row>
          </Form>
          <Row className='d-flex justify-content-around'></Row>
        </div>
      </div>
    );
  }
}
