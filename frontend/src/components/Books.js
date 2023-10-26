import {useState, useEffect} from "react";

const Books = () => {

    const [categories,setCategories] = useState([]);

    useEffect(() => {
        const getData = async() => {
            const response = await fetch(process.env.REACT_APP_BACKEND + "/api/categories", {method:"GET"})

            const data = await response.json()
            console.log(data)
            setCategories(data)
        }

        getData()
    }, [])

    return (
        <div>
            {categories.map(category => <p>{category.name}</p>)}
        </div>
    )
}

export default Books;