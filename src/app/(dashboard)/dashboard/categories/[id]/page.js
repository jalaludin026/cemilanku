export const metadata = {
  title: "Edit Category",
};

import EditCategoryView from "@/components/pages/dashboard/categories/edit/EditCategoryView";
const EditCategoryPage = ({ params }) => {
  const { id } = params;
  return <EditCategoryView id={id} />;
};

export default EditCategoryPage;
