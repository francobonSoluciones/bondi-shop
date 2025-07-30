import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import loadingsvg from "../assets/loading.svg";
import ProductBrowser from "../components/ProductBrowser";

const Home = ({ products, loading, error }) => {
  return (
    <>
      <Header />
      <main>
        <section className="bg-dark text-white py-5 mb-5">
          <div className="container">
            <div className="row align-items-center flex-column-reverse flex-md-row">
              <div className="col-md-6 text-center text-md-start">
                <h1 className="display-4 fw-bold mb-3">
                  Bienvenido a <span className="text-amber-200">BondiShop</span>
                </h1>
                <p className="lead mb-4">
                  Nueva temporada de ropa y accesorios. Descubrí las últimas tendencias y ofertas exclusivas.
                </p>
                <a href="#productos" className="btn btn-warning btn-lg shadow">
                  Ver productos
                </a>
              </div>
              <div className="col-md-6 mb-4 mb-md-0 text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2017/04/05/01/12/traveler-2203666_1280.jpg"
                  alt="Ropa de moda"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: 320, objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Productos */}
        <section id="productos" className="container py-5">
          <h2 className="text-center mb-4">Nuestros Productos Destacados</h2>
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
                src={loadingsvg}
                alt="loading"
                className="spinner"
                style={{ width: 64, height: 64 }}
              />
            </div>
          ) : (
            <ProductBrowser products={products} />
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
