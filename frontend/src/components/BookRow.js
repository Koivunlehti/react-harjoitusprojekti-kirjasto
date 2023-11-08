import {useState} from "react"

const BookRow = (props) => {
    const [book,setBook] = useState({
        "name":props.book.name,
        "writer":props.book.writer,
        "publisher":props.book.publisher,
        "page_amount":props.book.page_amount,
        "category_id":props.book.category_id,
        "loaned":props.book.loaned
    })

    const onChange = (event) => {
        setBook((book) => {
            return {
                ...book,
                [event.target.name]:event.target.value
            }
        })
    }

    if (props.admin) {
        return (
            <tr>
                <td>
                    <input type="text" name="name" value={book.name} onChange={onChange} />
                </td>
                <td>
                    <input type="text" name="writer" value={book.writer} onChange={onChange} />
                </td>
                <td>
                    <input type="text" name="publisher" value={book.publisher} onChange={onChange} />
                </td>
                <td>
                    <input type="number" name="page_amount" value={book.page_amount} onChange={onChange} />
                </td>
                <td>
                    <select name="category_id" onChange={onChange} value={book.category_id}>
                        {props.categories.map(category => <option key={category.name} name={category.name} value={category._id}>{category.name}</option>)}
                    </select>
                </td>
                <td>
                <input type="text" name="loaned" value={book.loaned} onChange={onChange} />
                </td>
                <td>
                    <button onClick={() => props.handleBookUpdate(props.book._id, book)}>Update</button>
                </td>
                <td>
                    <button onClick={() => props.handleBookDelete(props.book._id)}>Delete</button>
                </td>
            </tr>
        )
    }
    return (
        <tr>
            <td>
                {props.book.name}
            </td>
            <td>
                <button className="btn btn-outline-danger " onClick={() => props.onClick(props.book._id)}>Return book</button>
            </td>
        </tr>
    )    
}

export default BookRow