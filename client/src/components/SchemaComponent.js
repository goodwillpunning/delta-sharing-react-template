import Button from 'react-bootstrap/Button';

function SchemaComponent(props) {
    return (
        <div className="schema-card">
            {props.imageURL ?
                (
                    <img className="schema-img" alt="Schema" src={props.imageURL} />
                ) : (
                    <img className="schema-img" alt="Schema"
                         src="schema-icon.png" />
                )  
            }
            <strong>Schema: {props.name}</strong>
            <p>'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'</p>
            <Button className="schema-details-close-btn" variant="primary" size="sm" onClick={(e) => {console.log(e.target)}} >
            View tables
            </Button>
        </div>
        );
}

export default SchemaComponent;
