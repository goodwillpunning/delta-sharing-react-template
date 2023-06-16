function ShareComponent(props) {
    return (
        <div id={props.name} className="share-card" onClick={(e) => {console.log(e.target.name);}}>
            {props.imageURL ?
                (
                    <img className="share-img" alt="Share" src={props.imageURL} />
                ) : (
                    <img className="share-img" alt="Share"
                         src="https://user-images.githubusercontent.com/1446829/144671151-b095e1b9-2d24-4d3b-b3c6-a7041e491077.png" />
                )  
            }
            <h4>
                {props.name ? (props.name) : ('Untitled')}
            </h4>
            <p>
                {props.description ?
                (
                    props.description
                ) : (
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                )}
            </p>
        </div>
    );
}

export default ShareComponent;