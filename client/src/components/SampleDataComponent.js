import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function SampleDataComponent(props) {
    return (
        <>
            <Row>
                <Col>
                    <h3 className="sample-data-title">Viewing `{props.name}` details</h3>
                </Col>
                <Col xs={4}>
                    <Button className="sample-data-close-btn" variant="primary" size="sm" onClick={props.closeClick}>
                    Close
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {props.dataframe ? (
                        props.dataframe.dataframe
                    ) : (
                        <h4 className="shares-title">
                        <img className="App-loading-img" alt="Loading" src="loading.gif" />
                        Loading...
                        </h4>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default SampleDataComponent;
