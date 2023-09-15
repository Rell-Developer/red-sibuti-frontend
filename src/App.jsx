// Importaciones
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './index.css'

// Join Layout
import JoinLayout from './layouts/public/JoinLayout.jsx';
import MainLayout from './layouts/private/MainLayout.jsx';
import ControlLayout from './layouts/private/ControlLayout.jsx';

// Pages
import Employments from './pages/private/Employments.jsx';

// Componentes
import EmploymentForm from './components/private/forms/EmploymentForm.jsx';

// Funcion a retornar
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rutas Publicas */}
          <Route path="/">
            <Route index element={<JoinLayout section={"signin"}/>}/>
            <Route path='registrarse' element={<JoinLayout section={"signup"}/>}/>
            <Route path='olvide-contrasena' element={<JoinLayout section={"forgot-password"}/>}/>
          </Route>

          {/* Rutas Privadas */}
          <Route path='/inicio' element={<MainLayout section={'employments'}/>}>
            {/* <Route index element={</>}/> */}
            <Route index path='control' element={<ControlLayout/>}/>
            <Route path='empleos' element={<Employments/>}/>
            <Route path='empleos/nuevo' element={<EmploymentForm/>}/>
            <Route path='empleos/:id' element={<EmploymentForm/>}/>
            {/* <Route path='jobs/new' element={</>}/> */}
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
