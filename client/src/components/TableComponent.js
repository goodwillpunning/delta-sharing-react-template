import Button from 'react-bootstrap/Button';

function TableComponent(props) {
    return (
        <div className="table-card">
            {props.imageURL ?
                (
                    <img className="table-img" alt="Table" src={props.imageURL} />
                ) : (
                    <img className="table-img" alt="Table"
                         src="table-icon.png" />
                )  
            }
            <p className="name">{props.name}</p>
            <p>'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'</p>
            <Button id={props.name + '_btn'} variant="primary" size="sm" onClick={props.buttonClick} >
            View data
            </Button>
        </div>
        );
}

export default TableComponent;
