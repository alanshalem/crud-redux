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
	COMENZAR_EDICION_PRODUCTO,
	PRODUCTO_EDITADO_ERROR,
	PRODUCTO_EDITADO_EXITO,
} from "../types";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

import { clienteAxios } from "../config/axios";
// Creamos nuestro primer action
// En los actions se mandan a llamar las consultas a las API y se modifica el state
// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
	return async (dispatch) => {
		dispatch(agregarProducto());
		try {
			// Insertar en la API
			await clienteAxios.post("/productos", producto);
			// Si todo sale bien, actualizamos el state
			dispatch(agregarProductoExito(producto));
			// Si todo sale bien, mostramos un mensaje
			Swal.fire({
				title: "Correcto",
				text: "El producto se agregó correctamente",
				icon: "success",
			});
		} catch (error) {
			console.log(error);
			// Si hay un error, cambiar el state
			dispatch(agregarProductoError(true));
			// Si hay un error, mostramos un mensaje
			Swal.fire({
				title: "Error",
				text: "Hubo un error, intenta de nuevo",
				icon: "error",
			});
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

// Funcion que descarga los productos de la API
export function obtenerProductosAction() {
	return async (dispatch) => {
		dispatch(comenzarDescargaProductos());
		try {
			const respuesta = await clienteAxios.get("/productos");
			dispatch(descargaProductosExitosa(respuesta.data));
		} catch (error) {
			console.log(error);
			dispatch(descargaProductosError());
		}
	};
}

const comenzarDescargaProductos = () => ({
	type: COMENZAR_DESCARGA_PRODUCTOS,
	payload: true,
});

const descargaProductosExitosa = (productos) => ({
	type: DESCARGA_PRODUCTOS_EXITO,
	payload: productos,
});

const descargaProductosError = () => ({
	type: DESCARGA_PRODUCTOS_ERROR,
	payload: true,
});

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
	return async (dispatch) => {
		dispatch(obtenerProductoEliminar(id));
		try {
			await clienteAxios.delete(`/productos/${id}`);
			dispatch(eliminarProductoExito());
		} catch (error) {
			console.log(error);
			dispatch(eliminarProductoError());
			// Si se elimina, mostrar alerta
			Swal.fire(
				"Eliminado",
				"El producto se eliminó correctamente.",
				"success"
			);
		}
	};
}

const obtenerProductoEliminar = (id) => ({
	type: OBTENER_PRODUCTO_ELIMINAR,
	payload: id,
});

const eliminarProductoExito = () => ({
	type: PRODUCTO_ELIMINADO_EXITO,
});

const eliminarProductoError = () => ({
	type: PRODUCTO_ELIMINADO_ERROR,
});

// Colocar producto en edicion
export function obtenerProductoEditar(producto) {
	return (dispatch) => {
		dispatch(obtenerProductoEditarAction(producto));
	};
}

const obtenerProductoEditarAction = (producto) => ({
	type: OBTENER_PRODUCTO_EDITAR,
	payload: producto,
});

export function editarProductoAction(producto) {
	return async (dispatch) => {
		dispatch(editarProducto());
		try {
			await clienteAxios.put(`/productos/${producto.id}`, producto);
			dispatch(editarProductoExito(producto));
		} catch (error) {
			console.log(error);
			dispatch(editarProductoError());
		}
	};
}

const editarProducto = () => ({
	type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = (producto) => ({
	type: PRODUCTO_EDITADO_EXITO,
	payload: producto,
});

const editarProductoError = () => ({
	type: PRODUCTO_EDITADO_ERROR,
	payload: true,
});
