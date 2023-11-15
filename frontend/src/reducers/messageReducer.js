const messageReducer = (message, action) => {
    switch(action.type) {
        case "success":
            return ({
                "success":action.success,
                "message":`${action.message}`
            }) 
        case "failed":
            if (action.data.Message)
                return ({
                    "success":action.success,
                    "message":`${action.message}: ${action.data.Message}`
                })
            else
                return ({
                    "success":action.success,
                    "message":`${action.message}: ${action.data.error}`
                })
        default:
            return ({
                "success":true,
                "message":""
            })
    }
}

export default messageReducer