// Hook
const dateTransform = (date) => {
    try {
        if (typeof(date) === "string") {
            date = new Date(date);
        }

        console.log(date);
        return date.toLocaleString();
    } catch (error) {
        console.log(error.message);
    }
}
// Exportar Hook
export default dateTransform;