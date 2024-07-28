import CheckoutView from "@/components/pages/checkout/CheckoutView";

export const metadata = {
  title: "Cemilanku - Checkout",
  description: "Toko sepatu terlurat",
};
const CheckoutPage = ({ params }) => {
  return <CheckoutView id={params.id} />;
};

export default CheckoutPage;
