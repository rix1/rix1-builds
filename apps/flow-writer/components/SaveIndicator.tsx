import { CheckIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import dayjs from 'dayjs';

type SaveIndicatorProps = {
  shouldHide: boolean;
  lastSavedAt: string | null;
};

const SaveIndicator = ({ shouldHide, lastSavedAt }: SaveIndicatorProps) => {
  if (!lastSavedAt) {
    return null;
  }
  return (
    <div
      className={clsx(
        'absolute bottom-1 left-1 flex text-xs text-slate-400 transition duration-300 ease-in-out',
        shouldHide ? 'opacity-0' : 'opacity-100',
        'w-full bg-slate-100 py-1',
      )}
    >
      <CheckIcon className="mr-1 h-4 w-4" /> Saved{' '}
      {dayjs(lastSavedAt).fromNow()}
    </div>
  );
};

export default SaveIndicator;
