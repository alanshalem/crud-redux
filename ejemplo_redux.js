// ! ============================================================================
// ! app.jsx
// ! ============================================================================
import { Provider } from "react-redux";
import store from "./store";
function App() {
	return (
		<Router>
			<Provider store={store}>
                ......... 
			</Provider>
		</Router>
	);
}
export default App;

// ! ============================================================================
// ! store.js
// ! ============================================================================
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk),
		typeof window === "object" &&
			typeof window.__REDUX_DEVTOOLS_EXTENSION__ != undefined
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: (f) => f // esto es para que funcione el redux dev tools
	)
);

// ! ============================================================================
// ! types/index.js
// ! ============================================================================
export const AGREGAR_PRODUCTO = "AGREGAR_PRODUCTO";
export const AGREGAR_PRODUCTO_EXITO = "AGREGAR_PRODUCTO_EXITO";
export const AGREGAR_PRODUCTO_ERROR = "AGREGAR_PRODUCTO_ERROR";

// ! ============================================================================
// ! reducers/index.js
// ! ============================================================================
import { combineReducers } from "redux";
import productosReducer from "./productosReducer";
export default combineReducers({
	productos: productosReducer,
});

// ! ============================================================================
// ! reducers/productosReducer.js
// ! ============================================================================
const initialState = {
	productos: [],
	error: null,
	loading: false,
};
export default function (state = initialState, action) {
	switch (action.type) {
		case AGREGAR_PRODUCTO:
			return {
				...state,
				loading: action.payload,
			};
		case AGREGAR_PRODUCTO_EXITO:
			return {
				...state,
				loading: false,
				productos: [...state.productos, action.payload],
			};
		case AGREGAR_PRODUCTO_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
}

// !  ============================================================================
// ! actions/productosActions.js
// ! ============================================================================
export function crearNuevoProductoAction(producto) {
	return (dispatch) => {
		dispatch(agregarProducto());
		try {
			dispatch(agregarProductoExito(producto));
		} catch (error) {
			dispatch(agregarProductoError(true));
		}
	};
}
const agregarProducto = () => ({
	type: AGREGAR_PRODUCTO,
	payload: true,
});
const agregarProductoExito = (producto) => ({
	type: AGREGAR_PRODUCTO_EXITO,
	payload: producto, // como vamos a modificar el state, pasamos un payload
});
const agregarProductoError = (estado) => ({
	type: AGREGAR_PRODUCTO_ERROR,
	payload: estado,
});

// ! ============================================================================
// ! components/nuevoProducto.jsx
// ! ============================================================================
import { useDispatch, useSelector } from "react-redux";
import { crearNuevoProductoAction } from "../actions/productoActions";

const NuevoProducto = () => {
	const [nombre, guardarNombre] = useState("");
	const [precio, guardarPrecio] = useState(0);
	const dispatch = useDispatch();
    const cargando = useSelector((state) => state.productos.loading);
	const error = useSelector((state) => state.productos.error);

	const agregarProducto = (producto) =>	dispatch(crearNuevoProductoAction(producto));

	const submitNuevoProducto = (e) => {
		e.preventDefault();
		agregarProducto({ nombre, precio });
	};
    return (<>...</>)
}
export default NuevoProducto;