import React, { useState } from "react";
import { toast } from "react-toastify";

const EditProductForm = ({ product, onCancel, onSave }) => {
  const [form, setForm] = useState({ ...product });
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

    try {
      const { id, ...body } = form;
      const response = await fetch(
        `https://686326ce88359a373e94065b.mockapi.io/products/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Error al editar producto");
      }
      toast.success("Producto editado correctamente");
      onSave();
    } catch (err) {
      console.error("Error al editar producto:", err);
      toast.error("No se pudo editar el producto");
    }
    setLoadingAction(false);
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-white shadow mx-auto"
        style={{ maxWidth: 400 }}
      >
        <h2 className="mb-4 text-center">Editar Producto</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="form-control mb-3"
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
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
          minLength={10}
          className="form-control mb-3"
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
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={form.imagen}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loadingAction}
          >
            {loadingAction ? "Guardando..." : "Guardar cambios"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
