import { Fragment, useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  // Citas en local storage
  let citasInciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasInciales) {
    citasInciales = [];
  }

  // Arreglo de citas
  const [citas, setCitas] = useState(citasInciales);

  // Use Effect para realizarciertas operaiones cuando el use State cambia
  useEffect(() => {
    if (citasInciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasInciales]);

  // Guardar cita
  const crearCita = (cita) => {
    setCitas([...citas, cita]);
  };

  // Eliminarcita por su ID
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    setCitas(nuevasCitas);
  };

  const titulo = citas.length === 0 ? 'No hay citas' : 'Tus Citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
