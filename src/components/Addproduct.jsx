import React, { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  nombre: "",
  precio: "",
  descripcion: "",
  stock: "",
  imagen: "",
  categoria: "",
};

const AddProduct = ({ onProductAdded }) => {
  const [form, setForm] = useState(initialState);
  const [loadingAction, setLoadingAction] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    if (!form.nombre.trim()) return "El nombre es obligatorio.";
    if (Number(form.precio) <= 0) return "El precio debe ser mayor a 0.";
    if (form.descripcion.trim().length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (Number(form.stock) < 0) return "El stock no puede ser negativo.";
    if (!form.imagen.trim()) return "La URL de la imagen es obligatoria.";
    if (!form.categoria.trim()) return "La categoría es obligatoria.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      setLoadingAction(false);
      return;
    }

    const url = "https://686326ce88359a373e94065b.mockapi.io/products";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          precio: Number(form.precio),
          descripcion: form.descripcion,
          stock: Number(form.stock),
          imagen: form.imagen,
          categoria: form.categoria,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al editar producto");
      }
      toast.success("Producto agregado correctamente");
      setForm(initialState);
      onProductAdded();
    } catch (err) {
      console.error("Error al editar producto:", err);
      toast.error("No se pudo agregar el producto");
    }
    setLoadingAction(false);
  };

  return (
    <form
      className="p-4 border rounded bg-white shadow"
      style={{ maxWidth: 400, margin: "2rem auto" }}
      onSubmit={handleSubmit}
    >
      <h2>Agregar Producto</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
        className="form-control mb-3"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={form.precio}
        onChange={handleChange}
        required
        min={1}
        className="form-control mb-3"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        required
        minLength={10}
        className="form-control mb-3"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
        min={0}
        className="form-control mb-3"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="text"
        name="imagen"
        placeholder="URL de la imagen"
        value={form.imagen}
        onChange={handleChange}
        required
        className="form-control mb-3"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={form.categoria}
        onChange={handleChange}
        required
        className="form-control mb-3"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <button type="submit" disabled={loadingAction}>
        {loadingAction ? "Agregando..." : "Agregar Producto"}
      </button>
    </form>
  );
};

export default AddProduct;
