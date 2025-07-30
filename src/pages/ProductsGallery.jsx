import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import ProductBrowser from "../components/ProductBrowser";
import loadingImg from "../assets/loading.svg";

const ProductsGallery = ({ products, loading, error, refetchProducts }) => {
  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-600 text-white py-5 mb-4">
          <div className="container text-center">
            <h1 className="display-5 fw-bold mb-3">New Season</h1>
            <p className="lead mb-0">
              Esta siempre a la vanguardia con nuestras últimas colecciones.
            </p>
          </div>
        </section>
        <section>
          <div className="container">
            {error && (
              <p className="text-danger text-center fs-5">
                Error al cargar los productos.
              </p>
            )}
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: 200 }}
              >
                <img
                  src={loadingImg}
                  alt="loading"
                  className="spinner"
                  style={{ width: 64, height: 64 }}
                />
              </div>
            ) : (
              <ProductBrowser
                products={products}
                refetchProducts={refetchProducts} // ✅ se pasa a ProductBrowser
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductsGallery;