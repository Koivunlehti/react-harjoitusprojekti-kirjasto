const Category = (props) => {
    return (
        <div className="col">
            <div className="card hover__effect" onClick={() => props.handleClick(props.category)}>
                <h5 className="card-title text-center">{props.category.name}</h5>
                <p className="card-text text-center">{props.category.description}</p>
            </div>
        </div>
    )
}

export default Category