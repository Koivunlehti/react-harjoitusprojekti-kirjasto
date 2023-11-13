
const BookDetails = (props) => {
    return (
        <div className="card">
            
            <div className="card-header text-center">
                <h2 className="card-title">{props.book.name} {props.book.year ? "(" + props.book.year + ")" : ""}</h2>
            </div>
            <div className="card-body">
                <div className="row g-20">
                    <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><p className="card-text">Category: {props.category}</p></li>
                            <li className="list-group-item"><p className="card-text">Writer: {props.book.writer}</p></li>
                            <li className="list-group-item"><p className="card-text">Publisher: {props.book.publisher}</p></li>
                            <li className="list-group-item"><p className="card-text">Year of publishing: {props.book.year}</p></li>
                            <li className="list-group-item"><p className="card-text">Number of pages: {props.book.page_amount}</p></li>
                            <li className="list-group-item">
                                {props.isLoggedIn.user && props.book.loaned === "" ? <button className="btn btn-outline-primary me-3" onClick={() => props.loanBookHandler(props.book)}>Loan this book</button> : <></>}
                                <button className="btn btn-outline-secondary" onClick={props.handleClick}>Back</button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                            <h4 className="card-title">Book description</h4>
                            <p className="card-text" style={{whiteSpace: "pre-wrap"}}>{props.book.description ? props.book.description : "No description"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails