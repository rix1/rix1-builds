import { CheckIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';

type SaveIndicatorProps = {
  shouldHide: boolean;
  lastSavedAt: string | void;
};

const SaveIndicator = ({ shouldHide, lastSavedAt }: SaveIndicatorProps) => {
  if (!lastSavedAt) {
    return null;
  }
  return (
    <span
      className={clsx(
        'absolute bottom-1 left-1 flex text-xs text-slate-400 transition duration-300 ease-in-out',
        shouldHide ? 'opacity-0' : 'opacity-100',
      )}
    >
      <CheckIcon className="mr-1 h-4 w-4" /> Saved{' '}
      {dayjs(lastSavedAt).fromNow()}
    </span>
  );
};

export default SaveIndicator;
