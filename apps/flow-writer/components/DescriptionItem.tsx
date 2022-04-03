import clsx from 'clsx';

type DescriptionItemProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  white?: boolean;
};

const DescriptionItem = ({ children, label, white }: DescriptionItemProps) => (
  <div
    className={clsx(
      'max-w-xs overflow-hidden px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6',
      white ? 'bg-white' : 'bg-gray-50',
    )}
  >
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-ellipsis text-sm text-gray-900 sm:col-span-2 sm:mt-0 ">
      {children}
    </dd>
  </div>
);

export default DescriptionItem;
