import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
