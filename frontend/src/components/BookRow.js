const BookRow = (props) => {
    return (
        <tr>
            <td>
                {props.book.name}
            </td>
            <td>
                <button onClick={() => props.onClick(props.book._id)}>Return book</button>
            </td>
        </tr>
    )    
}

export default BookRow