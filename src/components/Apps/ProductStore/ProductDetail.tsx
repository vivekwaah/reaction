import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Product from './utils/Product';
import StoreNav from './StoreNav';
import { PRODUCT_URL } from './utils/config';

const ProductDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const PRODUCT_API = PRODUCT_URL + `/products/${id}`;

	useEffect(() => {
		fetch(PRODUCT_API)
			.then((res) => res.json())
			.then((data) => setProduct(data))
			.catch((error) => console.error('Error fetching product:', error));
	}, []);

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<StoreNav />
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
						<div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
							<span className="sr-only">{product.image}</span>
							<span className="inset-0 overflow-hidden rounded-md">
								<img src={product.image} alt="" className="h-full w-full object-cover object-center" />
							</span>
						</div>

						{/* Product info */}
						<div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
							<h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.title}</h1>

							<div className="mt-3">
								<h2 className="sr-only">Product information</h2>
								<p className="text-3xl tracking-tight text-gray-900">$ {product.price}</p>
							</div>

							{/* Reviews */}
							<div className="mt-3">
								<h3 className="sr-only">Reviews</h3>
								<div className="flex items-center">
									<p>{product.rating.rate} out of 5 stars</p>
								</div>
							</div>

							<div className="mt-6">
								<h3 className="sr-only">Description</h3>

								<div
									className="space-y-6 text-base text-gray-700"
									dangerouslySetInnerHTML={{ __html: product.description }}
								/>
							</div>

							<form className="mt-6">
								<div className="mt-10 flex">
									<button
										type="submit"
										className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
									>
										Add to bag
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductDetail;
