import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavigationComponent(props) {
    return (
        <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <img className="App-logo" alt="Logo" src="delta-sharing-nodejs-logo.png" />
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavigationComponent;
