// set metadata with data from api

import DetailProductView from "@/components/pages/products/detail/DetailProductView";

export async function generateMetadata({ params }) {
  const id = params.id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
  );

  const data = await res.json();

  if (!data) {
    return {
      title: "Product not found",
    };
  }

  const { name } = data;
  return {
    title: name,
    description: "Product detail",
    robots: "noindex, nofollow",
    keywords: "product, detail",
    author: "rifki",
    publisher: "rifki",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`,
    },
    openGraph: {
      title: name,
      description: "Product detail",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`,
      images: [
        {
          url: data.imageUrl, // Replace with the URL of your image
        },
      ],
    },
  };
}

const DetailProductPage = ({ params }) => {
  return <DetailProductView id={params.id} />;
};

export default DetailProductPage;
