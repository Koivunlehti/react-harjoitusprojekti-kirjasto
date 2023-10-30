const Category = (props) => {
    return (
        <>
            <button onClick={() => props.handleClick(props.category._id)}>{props.category.name}</button>
        </>
    )
}

export default Category