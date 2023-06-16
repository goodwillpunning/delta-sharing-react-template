import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ShareComponent from './components/ShareComponent';
import './App.css';

function App() {
  let [sharesResponse, setSharesResponse] = useState(null);
  // Fetch the shared datasets!
  useEffect(() => {
    fetch('/getShares')
      .then(response => response.json())
      .then(
        (response) => {
          setSharesResponse(response);
        },
        (error) => {
          console.log(error.message);
        });
  }, []);
  return (
    <Container>
      <Row>
        <Col xs={4}><h2>Shares</h2></Col>
        <Col>
          {sharesResponse ?
              sharesResponse.shares.map((share) => {
                return (<ShareComponent key={share} name={share} />);
              })
              : null}
        </Col>
      </Row>
    </Container>
    );
}

export default App;
