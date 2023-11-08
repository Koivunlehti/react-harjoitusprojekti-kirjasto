
const BookDetails = (props) => {
    return (
        <div className="card">
            <div className="card-header text-center">
                <h2 className="card-title">{props.book.name}</h2>
            </div>
            <div className="card-body">
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><p className="card-text">Writer: {props.book.writer}</p></li>
                <li className="list-group-item"><p className="card-text">Publisher: {props.book.publisher}</p></li>
                <li className="list-group-item"><p className="card-text">Number of pages: {props.book.page_amount}</p></li>
                <li className="list-group-item">
                    {props.isLoggedIn.user && props.book.loaned === "" ? <button className="btn btn-outline-primary me-3" onClick={() => props.loanBookHandler(props.book)}>Loan this book</button> : <></>}

                    <button className="btn btn-outline-secondary" onClick={props.handleClick}>Back</button>

                </li>
            </ul>
                
            </div>
        </div>
    )
}

export default BookDetails