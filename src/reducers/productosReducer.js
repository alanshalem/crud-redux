// Importo los types de los reducers
import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,
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

		default:
			return state;
	}
}
