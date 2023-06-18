import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ShareComponent from './ShareComponent';

function ShareSummary(props) {
    return (
        <>
            <Row>
                <Col>
                    <h2 className="shares-title">Available Shares</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    {props.sharesList ?
                        props.sharesList.shares.map((share) => {
                            return <ShareComponent key={share} name={share} buttonClick={props.buttonClick} />;
                        }
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

export default ShareSummary;
