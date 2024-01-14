// Importaciones
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
import { useState } from 'react';
import './index.css'

// Join Layout
import JoinLayout from './layouts/public/JoinLayout.jsx';
import MainLayout from './layouts/private/MainLayout.jsx';
import ControlLayout from './layouts/private/ControlLayout.jsx';

// Pages
import Employments from './pages/private/Employments.jsx';
import ViewEmployment from './pages/private/ViewEmployment.jsx';
import PostulationsList from './pages/private/PostulationsList.jsx';
import PostulationsListAdmin from './pages/private/PostulationListAdmin.jsx';
import Profile from './pages/private/Profile.jsx';
import PositionsList from './pages/private/admin/PositionsList.jsx';
import PositionForm from './components/private/forms/PositionForm.jsx';
import ServicesList from './pages/private/admin/ServicesList.jsx';
import ServiceOfferingsList from './pages/private/admin/ServiceOfferingsList.jsx';
import RatingsList from './pages/private/admin/RatingsList.jsx';

// Routes
import EmploymentsRoutes from './routes/EmploymentsRoutes.jsx';

// Componentes
import EmploymentForm from './components/private/forms/EmploymentForm.jsx';
import SecondLayout from './layouts/private/SecondLayout.jsx';
import UsersList from './pages/private/UsersList';
import OpenEmploymentsList from './components/private/lists/OpenEmploymentsList.jsx';
import ActiveServicesList from './components/private/lists/ActiveServicesList.jsx';
import ServiceForm from './components/private/forms/ServiceForm.jsx';
import ServiceOfferingForm from './components/private/forms/ServiceOfferingForm.jsx';
import RatingForm from './components/private/forms/RatingForm.jsx';

// Funcion a retornar
function App() {
  // Variable para la lista de chat
  let [chatList, setChatList] = useState([]);
  const [onAgreements, setOnAgreements] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rutas Publicas */}
          <Route path="/">
            {/* Persona Comun */}
            <Route index element={<JoinLayout section={"signin"} view={"common"}/>}/>
            <Route path='registrarse' element={<JoinLayout section={"signup"} view={"common"}/>}/>
            <Route path='olvide-contrasena' element={<JoinLayout section={"forgot-password"} view={"common"}/>}/>
            <Route path='confirmar/:token' element={<JoinLayout section={"confirm-account"} view={"common"}/>}/>
            <Route path='restablecer-contrasena/:token' element={<JoinLayout section={"reset-password"} view={"common"}/>}/>

            {/* Empresa */}
            <Route path='empresa/registrarse' element={<JoinLayout section={'signup'} view={"company"}/>}/>
          </Route>

          {/* Rutas Privadas */}
          <Route path='/inicio' element={<MainLayout section={'employments'} chatList={chatList} setChatList={setChatList} setOnAgreements={setOnAgreements} onAgreements={onAgreements}/>}>
            {/* <Route index element={</>}/> */}
            <Route path='' element={<SecondLayout chatList={chatList} setChatList={setChatList} onAgreements={onAgreements} />} >
              <Route index element={<OpenEmploymentsList/>}/>
              <Route path='servicios' element={<ActiveServicesList/>}/>
            </Route>
            <Route path='usuario/:id' element={<Profile setChatList={setChatList} chatList={chatList}/>}/>
            <Route path='ver-empleo/:id' element={<ViewEmployment/>}/>
            {/* Rutas para administradores y/o empresas */}
            <Route path='control' element={<ControlLayout/>}>
              {/* Empleos */}
              <Route path='empleos' element={<Outlet/>}>
                {/* Lista de Empleos */}
                <Route index element={<Employments/>}/>
                {/* Formulario */}
                <Route path='nuevo' element={<EmploymentForm/>}/>
                <Route path=':id' element={<EmploymentForm/>}/>
                {/* Lista de Postulaciones */}
                <Route path="postulaciones/:id" element={<PostulationsList/>}/>
              </Route>
              {/* Usuarios */}
              <Route path='usuarios' element={<Outlet/>}>
                <Route index element={<UsersList/>}/>
              </Route>
              {/* Postulaciones */}
              <Route path='postulaciones' element={<Outlet/>}>
                <Route index element={<PostulationsListAdmin/>}/>
              </Route>
              {/* Cargo */}
              <Route path='cargos' element={<Outlet/>}>
                <Route index element={<PositionsList/>}/>
                <Route path=":id" element={<PositionForm/>}/>
                <Route path="nuevo" element={<PositionForm/>}/>
              </Route>
              {/* Servicios */}
              <Route path='servicios' element={<Outlet/>}>
                <Route index element={<ServicesList/>}/>
                <Route path=":id" element={<ServiceForm/>}/>
                <Route path="nuevo" element={<ServiceForm/>}/>
              </Route>
              {/* Oferta de Servicios */}
              <Route path='oferta-servicios' element={<Outlet/>}>
                <Route index element={<ServiceOfferingsList/>}/>
                <Route path=":id" element={<ServiceOfferingForm/>}/>
                <Route path="nuevo" element={<ServiceOfferingForm/>}/>
              </Route>
              {/* Calificaciones */}
              <Route path='calificaciones' element={<Outlet/>}>
                <Route index element={<RatingsList/>}/>
                <Route path=":id" element={<RatingForm/>}/>
                {/* <Route path="nuevo" element={<ServiceOfferingForm/>}/> */}
              </Route>
            </Route>
          </Route>  

          {/* <Route path='/inicio/control' element={<ControlLayout/>}>
            <Route index path='employments' element={<Employments/>}/>
          </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
