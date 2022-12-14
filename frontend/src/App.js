import './App.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import PrivateRoutes from './routes/PrivateRoutes';
import Profile from './pages/Profile';
import Unauthorized from './pages/Unauthorized';
import NewProduct from './pages/NewProduct';
import NewAnnouncement from './pages/NewAnnouncement';
import Users from './pages/Users';

function App() {
  return (
    <div className="App">
        <Routes>      
          <Route element={<PrivateRoutes allowedRoles={["customer","creator","admin"]} />}>
            <Route path="/" element={<Home />} exact/>
            <Route path="/home" element={<Home /> }/>            
            <Route path="/products" element={<Products /> }/>
            <Route path="/profile" element={<Profile /> }/>
          </Route>
          <Route element={<PrivateRoutes allowedRoles={["creator"]} />}>
            <Route  path="/new/product" element={<NewProduct /> }/>
            <Route  path="/new/announcement" element={<NewAnnouncement /> }/>
          </Route >  
          <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
            <Route  path="/users" element={<Users /> }/>
          </Route >
          <Route path="/unauthorized" element={<Unauthorized /> }/>
          <Route path="/signin" element={<SignIn />} exact/>
          <Route path="/signup" element={<SignUp />} exact/>
          <Route path="*" element={<SignIn />} />
        </Routes>
    </div>
  );
}

export default App;
