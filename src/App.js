import React, { useState } from 'react';
import './App.css';

const images = [
  'https://i.ibb.co/tPLjnjDH/20250606-1144-Chico-en-Playa-simple-compose-01jx29xfyhfxws1r8h44bvm5ge.png',
  'https://i.ibb.co/htb1qdZ/20250606-1150-Mensaje-en-el-Cielo-remix-01jx2a9m79fedajdtkaj0xnebk.png',
  'https://i.ibb.co/BVd9Lj1D/20250606-1216-Vista-Cenital-y-Texto-remix-01jx2bqy7cfwrraj0s22vnz31n.png',
  'https://i.ibb.co/jPVSx8T1/20250606-1240-Atardecer-con-Texto-de-Nubes-remix-01jx2d4w0wft294mb3h8e9d2cx.png',
  'https://i.ibb.co/G4JpQ1bq/20250606-1244-Constelaci-n-de-Texto-Inspirador-remix-01jx2dcfb1fvt88ytafk6cdw1q.png',
  'https://i.ibb.co/35bwW84J/20250606-1254-Chico-y-Chiringuito-Nocturno-remix-01jx2dz67gfbns8k0qezes2rm9.png',
  'https://i.ibb.co/VcW999pJ/20250606-1259-Cena-Creativa-en-el-Paseo-remix-01jx2e7s6ber98pf3n44j1p2sw.png',
  'https://i.ibb.co/HLcLJnF0/20250606-1433-Cena-Interactiva-HTML-CSS-JS-remix-01jx2km0x0fdq9aeed3brvx8we.png',
  'https://i.ibb.co/gZFV1S1v/20250606-1437-Cena-de-Programaci-n-remix-01jx2ktxkrfb489x8s4t71abwh.png',
  'https://i.ibb.co/rGxPV0F4/20250606-1442-Cena-y-Programaci-n-remix-01jx2m4868e8gbt0a6wktgdk1n.png',
  'https://i.ibb.co/bjT1ctv4/20250606-1446-DJ-y-Portafolio-React-remix-01jx2mbrpfekw9tvzrpp23t0av.png',
  'https://i.ibb.co/SDt5D3SR/20250606-1451-Vuelta-a-Casa-Bailando-remix-01jx2mnm9retrvgam72kgzkgdr.png',
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tipo: '',
    presupuesto: '',
    descripcion: '',
    aceptar: false
  });

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleSelectImage = (index) => {
    setCurrentIndex(index);
    setShowGallery(false);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { nombre, telefono, tipo, presupuesto, descripcion, aceptar } = formData;
    if (!nombre || !telefono || !tipo || !presupuesto || !descripcion || !aceptar) {
      alert('Por favor, completa todos los campos obligatorios y acepta los términos.');
      return;
    }
    if (Number(presupuesto) < 250) {
      alert('El presupuesto mínimo debe ser 250.');
      return;
    }
    alert('Formulario enviado correctamente');
    setShowContactForm(false);
    setFormData({
      nombre: '',
      correo: '',
      telefono: '',
      tipo: '',
      presupuesto: '',
      descripcion: '',
      aceptar: false
    });
  };

  return (
    <div className="carousel">
      <div className="image-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`Imagen ${idx + 1}`} className="fullscreen-image" />
        ))}
      </div>

      <div className="carousel-container">
        <div className="buttons">
          <button className={`carousel-button ${currentIndex === 0 ? 'hidden' : ''}`} onClick={handlePrev}>⬅️ Anterior</button>
          <button className={`carousel-button ${currentIndex === images.length - 1 ? 'hidden' : ''}`} onClick={handleNext}>➡️ Siguiente</button>
          <button className="carousel-button" onClick={() => setShowGallery(true)}>🔄 Ver todas</button>
          <button className="carousel-button" onClick={() => setShowContactForm(true)}>📩 Contáctame</button>
        </div>
        <div className="disclaimer">
          Todas las imágenes han sido generadas con inteligencia artificial.
        </div>
      </div>

      {showGallery && (
        <div className="modal">
          <div className="modal-content-2">
            <button className="close-button" onClick={() => setShowGallery(false)}>❌</button>
            <div className="thumbnail-grid">
              {images.map((img, idx) => (
                <img key={idx} src={img} alt={`Miniatura ${idx + 1}`} className="thumbnail" onClick={() => handleSelectImage(idx)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {showContactForm && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowContactForm(false)}>❌</button>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <h2>Formulario de Contacto</h2>
              <br></br>
              <label>Nombre*:
                <input type="text" name="nombre" value={formData.nombre} onChange={handleFormChange} required />
              </label>
              <label>Correo:
                <input type="email" name="correo" value={formData.correo} onChange={handleFormChange} />
              </label>
              <label>Teléfono*:
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleFormChange} required />
              </label>
              <label>¿Qué tipo de página web buscas?*:
                <input type="text" name="tipo" value={formData.tipo} onChange={handleFormChange} required />
              </label>
              <label>Presupuesto (mínimo 250€)*:
                <input type="number" name="presupuesto" min="250" value={formData.presupuesto} onChange={handleFormChange} required />
              </label>
              <label>Descripción de la página deseada*:
                <textarea name="descripcion" value={formData.descripcion} onChange={handleFormChange} required />
              </label>
              <label>
                <input type="checkbox" name="aceptar" checked={formData.aceptar} onChange={handleFormChange} required />
                Acepto que estos datos se recopilen para contacto.
              </label>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
