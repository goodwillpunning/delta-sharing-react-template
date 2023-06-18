import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import TableComponent from './TableComponent';

function TablesSummary(props) {
    return (
        <>
            <Row>
                <Col>
                    <h2 className="schemas-title">Viewing `{props.shareName}` details</h2>
                </Col>
                <Col xs={4}>
                    <Button className="share-details-close-btn" variant="primary" size="sm" onClick={props.closeClick}>
                    Close
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {props.tablesList ? (
                    props.tablesList.tables.map((table) => {
                        return ( <TableComponent key={table} name={table} buttonClick={props.viewClick} /> );
                    })
                    ) : (
                    <h4 className="schemas-title">
                        <img className="App-loading-img" alt="Loading" src="loading.gif" />
                        Loading...
                    </h4>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default TablesSummary;
