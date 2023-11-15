// Importaciones
import { Route, Outlet } from "react-router-dom";
import Employments from "../pages/private/Employments.jsx";
import EmploymentForm from "../components/private/forms/EmploymentForm.jsx";
import PostulationsList from "../pages/private/PostulationsList.jsx";
// Rutas del apartado de empleos
const EmploymentsRoutes = () => {
    return (
        <Route path='empleos' element={<Outlet/>}>
            {/* Lista de Empleos */}
            <Route index element={<Employments/>}/>
            {/* Formulario */}
            <Route path='nuevo' element={<EmploymentForm/>}/>
            <Route path=':id' element={<EmploymentForm/>}/>
            {/* Lista de Postulaciones */}
            <Route path="postulaciones/:id" element={<PostulationsList/>}/>
        </Route>
    )
}

export default EmploymentsRoutes;