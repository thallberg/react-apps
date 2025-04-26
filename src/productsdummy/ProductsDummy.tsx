import { useEffect, useState } from "react";

const API_URL = "https://dummyjson.com/products";

interface Products {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  images: string[];
}

const ProductsDummy = () => {
  const [products, setProducts] = useState<Products[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: { products: Products[] }) => {
        setProducts(data.products);
      });
  }, []);

  const filteredProducts = products?.filter(
    (product) =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <article className="w-full h-full flex flex-col">
      <div className="self-center m-auto py-4">
        <input
          className="rounded-2xl py-1 outline-1 px-2"
          placeholder="Search..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="bg-blue-500 px-4 py-1 rounded-2xl ml-8"
          type="submit"
        >
          Sök
        </button>
      </div>
      <div className="flex flex-row flex-wrap gap-2 justify-evenly">
        {filteredProducts?.map((product) => (
          <div className="bg-gray-200 p-1 flex flex-col w-85" key={product.id}>
            <h1 className="text-center py-2 text-lg">{product.title}</h1>

            <div className="grid grid-cols-1 place-items-center">
              <img
                src={product.images[0]}
                alt={`${product.images} images ${product.title}`}
                className="object-contain w-44 h-44"
              />
            </div>

            <div className="flex flex-row justify-between p-1">
              <p>{product.price}</p>
              <p>{product.category}</p>
            </div>
            <div className="flex flex-row justify-between p-1">
              <h2>{product.brand}</h2>
              <p>{product.rating}</p>
            </div>
            <p className="text-center py-2">{product.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default ProductsDummy;
