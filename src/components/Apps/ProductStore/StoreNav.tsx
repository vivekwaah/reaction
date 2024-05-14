import { useEffect, useState } from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { PRODUCT_URL } from './utils/config';

const StoreNav: React.FC = () => {
	const [productCategories, setProductCategories] = useState([]);
	const PRODUCTS_CATEGORIES_API = PRODUCT_URL + `/products/categories`;

	useEffect(() => {
		fetch(PRODUCTS_CATEGORIES_API)
			.then((res) => res.json())
			.then((data) => setProductCategories(data))
			.catch((error) => console.error('Error fetching product:', error));
	}, []);

	return (
		<div className="bg-white">
			<header className="relative bg-white">
				<nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
						<div className="flex h-16 items-center justify-between">

							<div className="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
								<div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
									{productCategories.map((item, index) => (
										<Link
											key={index}
											to={item}
											className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 capitalize"
										>
											{item}

										</Link>
									))}
								</div>
							</div>

							<div className="flex flex-1 items-center justify-end">
								<div className="ml-4 flow-root lg:ml-8">
									<Link
										to={'/store/cart'}
										className="group -m-2 flex items-center p-2"
									>
										<ShoppingBagIcon
											className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
										<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
										<span className="sr-only">items in cart, view bag</span>

									</Link>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}
export default StoreNav;
