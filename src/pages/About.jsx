import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";

const About = () => {
  return (
    <>
      <Header />
      <main>
        <section className="bg-light py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 mb-4 mb-md-0">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Edificio empresa de tecnología"
                  className="img-fluid rounded shadow h-10"
                  style={{ maxHeight: 340, objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <h1 className="fw-bold mb-3">Nuestra Misión</h1>
                <p className="lead">
                  Somos <strong>Bondi Shop</strong>, una tienda especializada en
                  ropa y accesorios de última moda. Nuestra misión es ofrecerte
                  las últimas tendencias y productos de alta calidad a precios
                  competitivos.
                </p>
                <p>
                  Nuestro catálogo incluye una amplia variedad de
                  productos, desde ropa casual hasta accesorios elegantes. Nos
                  enorgullece trabajar con marcas reconocidas y emergentes para
                  brindarte lo mejor en moda.
                </p>
                <p>
                  En <strong>BondiShop</strong> creemos que la moda es una forma de
                  expresión personal. Por eso, nos esforzamos por ofrecerte
                  productos que se adapten a tu estilo único y te hagan sentir
                  seguro y cómodo.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
