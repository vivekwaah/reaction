import React, { useEffect, useState } from 'react';
import Product from './utils/Product';
import StoreNav from './StoreNav';
import ProductCard from './ProductCard';
import { PRODUCT_URL } from './utils/config';

const Products: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const PRODUCTS_API = PRODUCT_URL + `/products`;


	useEffect(() => {
		fetch(PRODUCTS_API)
			.then((res) => res.json())
			.then((json: Product[]) => setProducts(json));
	}, []);

	return (
		<>
			<StoreNav />
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="sr-only">Products</h2>

					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
							<ProductCard product={product} key={product.id} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Products;
