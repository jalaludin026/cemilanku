"use client";

import { useEffect, useState } from "react";
import ListProducts from "./ListProducts";
import ProductSkeleton from "./ProductSkeleton";
import { FaSearch } from "react-icons/fa";

const HomeView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [take, setTake] = useState(8);
  const [skip, setSkip] = useState(0);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [orderPrice, setOrderPrice] = useState("asc");
  const [loadingCategories, setLoadingCategories] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    if (keyword === "") {
      setProducts([]);
      setSkip(0);
      fetch(`/api/products?take=${take}&skip=${skip}&orderPrice=${orderPrice}`)
        .then((res) =>
          res.json().then((data) => {
            if (data.products) {
              setProducts(data.products);
              setTotal(data.total);
            }
          })
        )
        .finally(() => setLoading(false));
    } else {
      setSkip(0);
      setProducts([]);
      fetch(`/api/products?keyword=${keyword}`)
        .then((res) =>
          res.json().then((data) => {
            if (data.products) {
              setProducts(data.products);
              setTotal(data.total);
            }
          })
        )
        .finally(() => setLoading(false));
    }
  };

  const loadMore = async () => {
    setLoading(true);
    const newSkip = skip + take;
    fetch(`/api/products?take=${take}&skip=${newSkip}&orderPrice=${orderPrice}`)
      .then((res) =>
        res.json().then((data) => {
          if (data.products) {
            setProducts([...products, ...data.products]);
            setTotal(data.total);
          }
        })
      )
      .finally(() => setLoading(false));

    setSkip(newSkip);
  };

  useEffect(() => {
    setLoading(true);
    setProducts([]);
    const resetSkip = 0;

    fetch(
      `/api/products?take=${take}&skip=${resetSkip}&orderPrice=${orderPrice}`
    )
      .then((res) =>
        res.json().then((data) => {
          if (data.products) {
            setProducts(data.products);
            setTotal(data.total);
          }
        })
      )
      .finally(() => setLoading(false));

    setSkip(resetSkip);
  }, [orderPrice]);

  useEffect(() => {
    setLoadingCategories(true);
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .finally(() => setLoadingCategories(false));
  }, []);

  const loadProductWithCategory = (category) => {
    setLoading(true);
    if (category) {
      setSkip(0);
      setProducts([]);
      fetch(`/api/products?category=${category}&orderPrice=${orderPrice}`)
        .then((res) =>
          res.json().then((data) => {
            if (data.products) {
              setProducts(data.products);
              setTotal(data.total);
            }
          })
        )
        .finally(() => setLoading(false));
    } else {
      setProducts([]);
      fetch(`/api/products?take=${take}&skip=${skip}&orderPrice=${orderPrice}`)
        .then((res) =>
          res.json().then((data) => {
            if (data.products) {
              setProducts(data.products);
              setTotal(data.total);
            }
          })
        )
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 space-y-5">
      <div className="w-full p-5 bg-white border-b-2 flex justify-between items-start">
        <h1 className="text-2xl font-bold">Products</h1>
        <select
          onChange={(e) => setOrderPrice(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded w-40 md:hidden block"
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <ListProducts products={products} />
          <div className="my-3">{loading && <ProductSkeleton />}</div>

          {/* load more */}
          {products && total > products.length && !loading && (
            <div className="w-full flex justify-center my-3">
              <button
                onClick={loadMore}
                className="bg-gray-800 text-white p-3 rounded"
              >
                Load More
              </button>
            </div>
          )}
        </div>
        <div className="w-96 md:block hidden h-screen sticky">
          {/* search */}
          <div className="w-full p-5 bg-white border-b-2 space-y-5">
            <h1 className="text-lg  font-semibold">Search</h1>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search Products"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <button className="bg-gray-800 text-white p-3 rounded">
                <FaSearch />
              </button>
            </form>
          </div>

          {/* categories */}
          <div className="w-full p-5 bg-white border-b-2 space-y-5">
            <h1 className="text-lg  font-semibold">Categories</h1>
            <select
              onChange={(e) => loadProductWithCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              disabled={loadingCategories}
            >
              {loadingCategories ? (
                <option value="">Loading...</option>
              ) : (
                <>
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* price */}
          <div className="w-full p-5 bg-white border-b-2 space-y-5">
            <h1 className="text-lg  font-semibold">Price</h1>
            <select
              onChange={(e) => setOrderPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
