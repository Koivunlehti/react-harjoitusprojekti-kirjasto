import {useState} from "react"

const CategoryRow = (props) => {
    const [category, setCategory] = useState({
        "name":props.category.name,
        "description":props.category.description === undefined ? "" : props.category.description,
    });

    const onChange = (event) => {
         setCategory((category) => {
            return {
                ...category,
                [event.target.name]:event.target.value
            }
        })
    }
<textarea name="description" value={category.description} onChange={onChange} />
    return (
        <>
            <tr>
                {props.admin ? <td><input name="name" onChange={onChange} value={category.name}></input></td> : <td>{props.category.name}</td>}
                {props.admin ? <td><textarea name="description" value={category.description} onChange={onChange} /></td> : <td>{props.category.description}</td>}
                {props.admin ? <td><button className="btn btn-outline-success" onClick={() => props.handleCategoryUpdate(props.category._id, category)}>Update</button></td> : <></>}
                {props.admin ? <td><button className="btn btn-outline-danger"onClick={() => props.handleCategoryDelete(props.category._id)}>Delete</button></td> : <></>}
            </tr>
        </>
    )
}

export default CategoryRow