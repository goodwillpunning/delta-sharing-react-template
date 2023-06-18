import Button from 'react-bootstrap/Button';

function trimShareName(name) {
    let output = name;
    if (name.length > 22)
        output = name.substring(0, 19) + '...';
    return output;
}
function ShareComponent(props) {
    return (
        <div id={props.name} className="share-card">
            {props.imageURL ?
                (
                    <img className="share-img" alt="Share" src={props.imageURL} />
                ) : (
                    <img className="share-img" alt="Share"
                         src="delta-sharing-logo.png" />
                )  
            }
            <strong>
                {props.name ? (trimShareName(props.name)) : ('Untitled')}
            </strong>
            <p>
                {props.description ?
                (
                    props.description
                ) : (
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                )}
            </p>
            <Button id={props.name + '_btn'} variant="primary" size="sm" onClick={props.buttonClick}>
                View
            </Button>
        </div>
    );
}

export default ShareComponent;