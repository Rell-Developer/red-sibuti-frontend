import Cell from "./Cell.jsx"

const CellGroup = ({user}) => {
    let Users = {
        keys: Object.keys(user),
        values: Object.values(user)
    }
    return (
        <>
            {
                Users.keys.map((key, index) => <Cell element={Users['values'][index]}/>)
            }
        </>
    )
}

export default CellGroup