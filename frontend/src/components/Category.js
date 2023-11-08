const Category = (props) => {
    return (
        <div className="col">
            <div className="card hover__effect" onClick={() => props.handleClick(props.category._id)}>
                <h5 className="card-title text-center">{props.category.name}</h5>
            </div>
        </div>
    )
}

export default Category