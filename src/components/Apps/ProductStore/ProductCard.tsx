import React from 'react'
import { Link } from 'react-router-dom';
import ProductInterface from './utils/Product';

interface Props {
	product: ProductInterface;
}

const ProductCard: React.FC<Props> = ({product}) => {
	return (
		<Link key={product.id} to={`/store/product/` + product.id} className="group">
			<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 h-32">
				<img
					src={product.image}
					alt={product.title}
					className="object-cover object-center group-hover:opacity-75"
				/>
			</div>
			<h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
			<p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
		</Link>
	)
}

export default ProductCard