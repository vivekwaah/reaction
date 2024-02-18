import { Link } from "react-router-dom"
import { AppNavigations } from "../navigations/AppNavigations"

const Home: React.FC = () => {
	return (
		<ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
			{AppNavigations.filter(app => app.route !== "/").map((app) => (
				<li className="relative bg-zinc-200 rounded-lg">
					<Link
						to={app.route}
					>
						<div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
							<img loading="lazy" src="https://source.unsplash.com/random/300×300?city,night" alt="" className="pointer-events-none object-cover group-hover:opacity-75" />

						</div>

						<div className="flex justify-between items-center mt-2 px-2 pb-2">
							<app.icon className="text-gray-400 group-hover:text-indigo-600 h-6 w-6 shrink-0" aria-hidden="true" />
							<p className="pointer-events-none mt-2 text-sm truncate font-medium text-gray-500">{app.name}</p>
						</div>

					</Link>
				</li>
			))}
		</ul>
	)
}
export default Home