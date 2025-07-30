import React, { useState } from "react";
import ProductList from "./ProductList";
import Pagination from "./Pagination";

const ProductBrowser = ({
  products,
  isAdmin,
  onEdit,
  onDelete,
  refetchProducts, 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="product-browser-section">
      <div className="row mb-4">
        <div className="col-md-8 col-lg-6 mx-auto">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Buscar productos por nombre..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {currentProducts.length > 0 ? (
        <ProductList
          products={currentProducts}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          refetchProducts={refetchProducts} 
        />
      ) : (
        <div className="text-center py-5">
          <p className="lead">No se encontraron productos.</p>
        </div>
      )}

      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductBrowser;
