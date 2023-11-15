const categoryReducer = (categories, action) => {
    console.log("categoryReducer")
    switch(action.type) {
        case "create":
            return (
                action.categories
            )

        case "add":
            return ([...categories, {
                    "_id":action.category._id,
                    "name":action.category.name,
                    "description":action.category.description,
                    "__v":action.category.__v
            }])
        
        case "update":
            return categories.map(category => category._id === action.category._id ? action.category : category)

        case "delete":
            return categories.filter(category => category._id !== action.id)
    }
}
export default categoryReducer