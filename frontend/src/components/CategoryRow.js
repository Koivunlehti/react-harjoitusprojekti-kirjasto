import {useState} from "react"

const CategoryRow = (props) => {
    const [catName, setCatName] = useState(props.category.name);

    const onChange = (event) => {
        setCatName(event.target.value)
    }

    return (
        <>
            <tr>
                {props.admin ? <td><input onChange={onChange} value={catName}></input></td> : <td>{props.category.name}</td>}
                {props.admin ? <td><button className="btn btn-outline-success" onClick={() => props.handleCategoryUpdate(props.category._id, catName)}>Update</button></td> : <></>}
                {props.admin ? <td><button className="btn btn-outline-danger"onClick={() => props.handleCategoryDelete(props.category._id)}>Delete</button></td> : <></>}
            </tr>
        </>
    )
}

export default CategoryRow