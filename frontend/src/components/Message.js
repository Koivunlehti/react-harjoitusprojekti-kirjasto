
const Message = (props) => {
    if (!props.message.message) {
        return <></>
    }
    if(props.message.success){
        return (
            <div className="card border-success mb-3">
                <div className="card-header bg-success text-light">Success</div>
                <div className="card-body ">
                    <p className="card-text">{props.message.message}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="card border-danger mb-3">
                <div className="card-header bg-danger text-light">Failure</div>
                <div className="card-body ">
                    <p className="card-text">{props.message.message}</p>
                </div>
            </div>
        )
    }
}

export default Message