const BookDetails = (props) => {

    let loaned = ""
    if (props.book.loaned) {
        loaned = "This book is currently loaned"
    } else {
        loaned = "This book can be loaned"
    }

    return (
        <>
            <h2>{props.book.name}</h2>
            <p>Writer: {props.book.writer}</p>
            <p>Publisher: {props.book.publisher}</p>
            <p>Number of pages: {props.book.page_amount}</p>
            <p>{loaned}</p>
            <button onClick={props.handleClick}>Back</button>
        </>
    )
}

export default BookDetails