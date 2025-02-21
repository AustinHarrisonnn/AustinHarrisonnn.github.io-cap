const Gallery = ({ images }) => {
    return (
        <div>
            <h2>Your Screenshot Gallery!</h2>
            <div className="image-container">
                {images && images.length > 0 ? (
                    <ul>
                        {images.map((pic, index) => (
                            <li className="gallery" key={index}>
                                <img
                                    className="gallery-screenshot"
                                    key={index}
                                    src={pic}
                                    alt="Undefined screenshot from query"
                                    width="250"
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <h3>You haven't made a screenshot yet!</h3>
                    </div>
                )}
            </div>
        </div>
        );
    };
    
    export default Gallery;