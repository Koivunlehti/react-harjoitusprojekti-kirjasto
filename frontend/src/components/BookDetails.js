
const BookDetails = (props) => {
    return (
        <>
            <h2>{props.book.name}</h2>
            <p>Writer: {props.book.writer}</p>
            <p>Publisher: {props.book.publisher}</p>
            <p>Number of pages: {props.book.page_amount}</p>
            {props.isLoggedIn.user && props.book.loaned === "" ? <button onClick={() => props.loanBookHandler(props.book)}>Loan this book</button> : <></>}
            <button onClick={props.handleClick}>Back</button>
        </>
    )
}

export default BookDetails