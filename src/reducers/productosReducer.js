// Importo los types de los reducers
import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,
	COMENZAR_DESCARGA_PRODUCTOS,
	DESCARGA_PRODUCTOS_EXITO,
	DESCARGA_PRODUCTOS_ERROR,
	OBTENER_PRODUCTO_ELIMINAR,
	PRODUCTO_ELIMINADO_EXITO,
	PRODUCTO_ELIMINADO_ERROR,
	OBTENER_PRODUCTO_EDITAR,
	PRODUCTO_EDITADO_ERROR,
	PRODUCTO_EDITADO_EXITO,
} from "../types";

// Los reducers, son cada pieza (productos, usuarios, clientes) de la aplicacion que tiene un state
// Cada reducer tiene su propio state, igual que cuando usamos useState
// const [productos, setProductos] = useState([]); -
// const [error, setError] = useState(false);
// const [loading, setLoading] = useState(false);
const initialState = {
	productos: [],
	error: null,
	loading: false,
	productoeliminar: null,
	productoeditar: null,
};

export default function (state = initialState, action) {
	//  El reducer es un switch, en el action siempre se pasa un type
	// Cada case describe que pasa en nuestra aplicacion y va cambiando el state
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
		case COMENZAR_DESCARGA_PRODUCTOS:
			return {
				...state,
				loading: action.payload,
			};
		case DESCARGA_PRODUCTOS_EXITO:
			return {
				...state,
				loading: false,
				error: null,
				productos: action.payload,
			};
		case DESCARGA_PRODUCTOS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case OBTENER_PRODUCTO_ELIMINAR:
			return {
				...state,
				productoeliminar: action.payload,
			};
		case PRODUCTO_ELIMINADO_EXITO:
			return {
				...state,
				productos: state.productos.filter(
					(producto) => producto.id !== state.productoeliminar
				),
				productoeliminar: null,
			};
		case PRODUCTO_ELIMINADO_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case OBTENER_PRODUCTO_EDITAR:
			return {
				...state,
				productoeditar: action.payload,
			};
		case PRODUCTO_EDITADO_EXITO:
			return {
				...state,
				productoeditar: null,
				productos: state.productos.map((producto) =>
					producto.id === action.payload.id
						? (producto = action.payload)
						: producto
				),
				productoeditar: null,
			};
		case PRODUCTO_EDITADO_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
}
