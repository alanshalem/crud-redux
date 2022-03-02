import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
	borrarProductoAction,
	obtenerProductoEditar,
} from "../actions/productoActions";
import Swal from "sweetalert2";
const Producto = ({ producto }) => {
	const { nombre, precio, id } = producto;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	// Confirmar si desea eliminarlo
	const confirmarEliminarProducto = (id) => {
		// preguntar al usuario
		Swal.fire({
			title: "¿Estas seguro?",
			text: "Un producto que se elimina no se puede recuperar",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, eliminar!",
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				// pasarlo al action
				dispatch(borrarProductoAction(id));
			}
		});
	};

	// funcion que redirige de forma programada
	const redireccionarEdicion = (producto) => {
		dispatch(obtenerProductoEditar(producto));
		// redireccionar
		navigate(`/productos/editar/${id}`);
	};

	return (
		<tr key={id}>
			<td>{nombre}</td>
			<td>
				<span className='font-weight-bold'>${precio}</span>
			</td>
			<td className='acciones'>
				<button
					type='button'
					onClick={() => redireccionarEdicion(producto)}
					className='btn btn-warning mr-2'
				>
					Editar
				</button>
				<button
					type='button'
					className='btn btn-danger'
					onClick={() => {
						confirmarEliminarProducto(id);
					}}
				>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default Producto;
