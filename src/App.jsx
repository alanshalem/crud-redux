import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditarProducto from "./components/EditarProducto";
import Header from "./components/Header";
import NuevoProducto from "./components/NuevoProducto";
import Productos from "./components/Productos";
// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
	return (
		<Router>
			<Provider store={store}>
				<Header />
				<div className='container'>
					<Routes>
						<Route path='/' element={<Productos />} />
						<Route
							path='/productos/nuevo'
							element={<NuevoProducto />}
						/>
						<Route
							path='/productos/editar/:id'
							element={<EditarProducto />}
						/>
					</Routes>
				</div>
			</Provider>
		</Router>
	);
}

export default App;
