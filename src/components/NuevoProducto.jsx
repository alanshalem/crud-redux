import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Actions de Redux
import { crearNuevoProductoAction } from "../actions/productoActions";
import Spinner from "./Spinner";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

// history esta disponible cuando instalamos react-router-dom y nuestros componentes estan en el routing
const NuevoProducto = ({ history }) => {
	// State del componente
	const [nombre, guardarNombre] = useState("");
	const [precio, guardarPrecio] = useState(0);

	// utilizar use dispatch y te crea una funcion
	const dispatch = useDispatch();
	// utilizar useSelector para obtener el state
	const cargando = useSelector((state) => state.productos.loading);
	const error = useSelector((state) => state.productos.error);

	const alerta = useSelector((state) => state.alerta.alerta);

	// Mandar a llamar el action de productoAction
	const agregarProducto = (producto) =>
		dispatch(crearNuevoProductoAction(producto));

	// cuando el usuario haga submit
	const submitNuevoProducto = (e) => {
		e.preventDefault();
		// Validar formulario
		if (nombre.trim() === "" || precio <= 0) {
			const alerta = {
				mensaje: "Ambos campos son obligatorios",
				classes: "alert alert-danger text-center text-uppercase p3",
			};
			dispatch(mostrarAlerta(alerta));
			return;
		}

		// si no hay errores
		dispatch(ocultarAlertaAction());
		// crear el nuevo producto
		agregarProducto({ nombre, precio });
		history.push("/");
	};
	return (
		<div className='row justify-content-center'>
			<div className='col-md-8'>
				<div className='card'>
					<div className='card-body'>
						<h2 className='text-center mb-4 font-weight-bold'>
							Agregar Nuevo Producto
						</h2>
						{alerta ? (
							<p className={alerta.classes}>{alerta.msg}</p>
						) : null}

						<form onSubmit={submitNuevoProducto}>
							<div className='form-group'>
								<label>Nombre Producto</label>
								<input
									type='text'
									className='form-control'
									placeholder='Nombre Producto'
									name='nombre'
									value={nombre}
									onChange={(e) =>
										guardarNombre(e.target.value)
									}
								/>
								<label>Precio Producto</label>
								<input
									type='number'
									className='form-control'
									placeholder='Precio Producto'
									name='precio'
									value={precio}
									onChange={(e) =>
										guardarPrecio(Number(e.target.value))
									}
								/>
							</div>
							<button
								type='submit'
								className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
							>
								Agregar
							</button>
						</form>
						{cargando ? <Spinner /> : null}
						{error ? (
							<div className='alert alert-danger p-2'>
								Hubo un error
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NuevoProducto;
