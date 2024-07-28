import EditProductView from "@/components/pages/dashboard/products/edit/EditProductView";
import React from "react";

const DetailProductPage = ({ params }) => {
  const { id } = params;
  return <EditProductView id={id} />;
};

export default DetailProductPage;
