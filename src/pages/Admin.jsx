import React, { useState, useEffect } from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import AddProduct from "../components/Addproduct";
import ProductList from "../components/ProductList";
import EditProductForm from "../components/EditProductForm";
import { toast } from "react-toastify";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const fetchProducts = () => {
    fetch("https://686326ce88359a373e94065b.mockapi.io/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    try {
      const res = await fetch(
        `https://686326ce88359a373e94065b.mockapi.io/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Error deleting product");
      toast.success("Producto eliminado correctamente");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("No se pudo eliminar el producto");
    }
    setDeleteId(null);
    setLoadingDelete(false);
  };

  return (
    <>
      <Header />
      <AddProduct onProductAdded={fetchProducts} />
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(128,128,128,0.2)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: 60, height: 60 }}
            >
              <span className="visually-hidden">Cargando...</span>
            </div>
            <div className="mt-3 text-dark fs-5">Cargando productos...</div>
          </div>
        </div>
      )}
      {!loading && (
        <ProductList
          products={products}
          loading={loading}
          isAdmin={true}
          onDelete={(id) => setDeleteId(id)}
          onEdit={(product) => setEditProduct(product)}
        />
      )}
      {deleteId && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Seguro que deseas eliminar este producto?</p>
            <button
              onClick={() => handleDelete(deleteId)}
              disabled={loadingDelete}
            >
              {loadingDelete ? "Eliminando..." : "Sí, eliminar"}
            </button>
            <button onClick={() => setDeleteId(null)}>Cancelar</button>
          </div>
        </div>
      )}
      {editProduct && (
        <div className="modal">
          <div className="modal-content">
            <EditProductForm
              product={editProduct}
              onCancel={() => setEditProduct(null)}
              onSave={() => {
                setEditProduct(null);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Admin;
