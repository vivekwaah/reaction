import UserCpsStats from './utils/models';

interface Props {
  userStats: UserCpsStats;
}

const CpsStats: React.FC<Props> = ({ userStats }) => {
  return (
    <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
      {Object.keys(userStats).length !== 0 ? (
        Object.entries(userStats).map(([key, value]) => (
          <div className="px-4 py-5 sm:p-6" key={key}>
            <dt className="text-base font-normal text-gray-900">{key}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">{value}</div>
            </dd>
          </div>
        ))
      ) : (
          <div className="px-4 py-5 sm:p-6">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No stats yet!</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by challenging CPS.</p>
        </div>
      )}
    </dl>
  );
};

export default CpsStats;
