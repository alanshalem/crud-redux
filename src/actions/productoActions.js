// Importo los types de los reducers
import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,
} from "../types";

// Creamos nuestro primer action
// En los actions se mandan a llamar las consultas a las API y se modifica el state
// Crear nuevos productos
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

// Si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
	type: AGREGAR_PRODUCTO_EXITO,
	payload: producto, // como vamos a modificar el state, pasamos un payload
});

// Si hubo un error
const agregarProductoError = (estado) => ({
	type: AGREGAR_PRODUCTO_ERROR,
	payload: estado,
});
