import React, { Fragment, useState } from 'react';
import uuid from 'uuid';

function Formulario({ crearCita }) {
  // Crear State de Citas
  const [cita, setCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  });

  // Estado del error
  const [error, setError] = useState(false);

  const actualizarState = (event) => {
    setCita({ ...cita, [event.target.name]: event.target.value });
  };
  // Función que se ejecuta cada que el usuario escribe un input

  // Extraer valores

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Enviar formulario

  const submitCita = (event) => {
    event.preventDefault();

    // Validar Formulario

    if (mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === '') {
      setError(true);
      return;
    }

    setError(false);

    // Actualizar ID
    const id = uuid();
    const saveCita = { ...cita, id };

    // Crear Cita

    crearCita(saveCita);

    // Reinicar formulario

    setCita({ mascota: '', propietario: '', fecha: '', hora: '', sintomas: '' });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error ? <p className="alerta-error">Todos los campos son obligados</p> : null}

      <form onSubmit={submitCita}>
        <label>Nombre de la Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre de Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño"
          onChange={actualizarState}
          value={propietario}
        />
        <label>fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <textarea
          name="sintomas"
          className="u-full-width"
          placeholder="Describe los sintomas de tu mascota"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Solicitar Cita
        </button>
      </form>
    </Fragment>
  );
}

export default Formulario;
