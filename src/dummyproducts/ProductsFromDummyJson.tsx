import React, { useEffect, useState } from 'react'

const API_URL = 'https://dummyjson.com/products';

interface IProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail: string;
    rating: number;
    stock: number;
    brand: string;
}

const ProductsFromDummyJson = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>();

    useEffect(() => {
        const fetchProduct =  async () => {
            try {
                const response = await fetch(API_URL)
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('något gick fel vid hämtning av produkter', error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchProduct()
    }, [])

    const filteredProducts = products.filter((products) => 
    products.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if(isLoading) return <div>Laddar produkter</div>

  return (
    <section className='flex flex-col justify-center items-center py-4'>
        <input
        className='px-6 py-1 text-center'
         type="text"
         placeholder='Search by titel..'
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         />

         <div className='gap-4 flex flex-wrap w-full justify-center flex-row'>
            {filteredProducts.map((product) => (
                <article 
                className='border p-2 w-1/1 md:w-1/3 flex flex-col'
                key={product.id}>
                    <h2>{product.title}</h2>
                    <img src={product.thumbnail} alt="" />
                    <p>{product.brand}</p>
                    <p>{product.category}</p>
                    <p>{product.description}</p>
                    <p>{product.rating}</p>
                    <p>{product.stock}</p>
                    <p>{product.description}</p>
                </article>
            ))}
         </div>

    </section>
  )
}

export default ProductsFromDummyJson