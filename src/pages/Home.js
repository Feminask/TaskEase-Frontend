import React from 'react'
import "./Home.css";
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Todo from '../components/Todo'
import WithImg from '../components/WithImg'

function Home() {
  return (
<div className='m-3'>
        <Header></Header>
        <Row className='mt-3'>
        <Col lg={8} md={8}>
          <Todo />
        </Col>
        <Col lg={4} md={4}>
          <WithImg />
        </Col>
        </Row>
    
</div>  )
}

export default Home