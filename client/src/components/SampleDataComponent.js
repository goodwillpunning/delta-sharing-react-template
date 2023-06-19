import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Plot from 'react-plotly.js';

function SampleDataComponent(props) {
    return (
        <>
            <Row>
                <Col>
                    <h3 className="sample-data-title">Viewing `{props.name}` dataset</h3>
                </Col>
                <Col xs={4}>
                    <Button className="sample-data-close-btn" variant="primary" size="sm" onClick={props.closeClick}>
                    Close
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {props.tableRows ? (
                        <>
                            <Plot data={props.tableRows} />
                            <p className="output-warning">Limiting output to the first 5 columns and 100 rows.</p>
                        </>
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
