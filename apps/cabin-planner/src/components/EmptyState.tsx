import { HomeIcon } from '@heroicons/react/outline';

type EmptyStateProps = {
  children: React.ReactNode;
};

const EmptyState = ({ children }: EmptyStateProps) => {
  return (
    <div className="text-center ">
      <HomeIcon className="mx-auto h-12 w-12 text-gray-400/50" />
      {children}
    </div>
  );
};

export default EmptyState;
