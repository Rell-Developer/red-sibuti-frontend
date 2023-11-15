// Importaciones
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
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

// Routes
import EmploymentsRoutes from './routes/EmploymentsRoutes.jsx';

// Componentes
import EmploymentForm from './components/private/forms/EmploymentForm.jsx';
import SecondLayout from './layouts/private/SecondLayout.jsx';
import UsersList from './pages/private/UsersList';

// Funcion a retornar
function App() {
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
          <Route path='/inicio' element={<MainLayout section={'employments'}/>}>
            {/* <Route index element={</>}/> */}
            <Route index element={<SecondLayout/>} />
            <Route path='usuario/:id' element={<Profile/>}/>
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
