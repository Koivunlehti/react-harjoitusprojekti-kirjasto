const Book = (props) => {
    return (
        <div>
        <p>{props.book.name}</p>
        <button onClick={() => props.handleClick(props.book)}>Details</button>
        </div>
    )
}

export default Book