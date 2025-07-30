import React, { useState } from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import { BsEnvelopeFill, BsWhatsapp } from "react-icons/bs";
import { toast } from "react-toastify";

const Contacts = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, message } = form;

    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Por favor, introduce un formato de email válido.";
    }

    if (!message.trim()) newErrors.message = "El mensaje es obligatorio.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      toast.success(
        "Mensaje enviado correctamente. ¡Gracias por contactarnos!"
      );
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    }
  };

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h1 className="mb-3">Contacto</h1>
              <p className="lead">
                ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
              </p>
            </div>

            {/* Canales de Contacto */}
            <div className="card mb-5 shadow-sm">
              <div className="row g-0 justify-content-center">
                <div className="col-md-3">
                  <img
                    src="https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="img-fluid rounded-start h-100"
                    alt="Silla con ropa apoyada"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body p-3 d-flex flex-column justify-content-center">
                    <h3 className="card-title mb-2">Nuestros Canales</h3>
                    <p className="card-text">
                      <BsEnvelopeFill className="me-2 text-primary" />
                      <strong>Email:</strong>{" "}
                      <a href="mailto:contacto@bondishop.com" className="text-decoration-none">
                        contacto@bondishop.com
                      </a>
                    </p>
                    <p className="card-text mb-0">
                      <BsWhatsapp className="me-2 text-success" />
                      <strong>WhatsApp:</strong>{" "}
                      <a
                        href="https://wa.me/5491223456789"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +54 9 12 2345-6789
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="card p-4 shadow-sm">
              <h3 className="card-title mb-4">Contactanos</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Tu Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Tu Mensaje
                  </label>
                  <textarea
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    id="message"
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contacts;
