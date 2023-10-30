const Book = (props) => {
    return (
        <div>
        <h3>{props.book.name}</h3>
        <button onClick={() => props.handleClick(props.book)}>Details</button>
        </div>
    )
}

export default Book