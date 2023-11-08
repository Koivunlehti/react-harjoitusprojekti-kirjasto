const Book = (props) => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">{props.book.name}</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">Written by: {props.book.writer}</p>
                    <button className="btn btn-outline-secondary" onClick={() => props.handleClick(props.book)}>Details</button>
                </div>
            </div>
        </div>
    )
}

export default Book