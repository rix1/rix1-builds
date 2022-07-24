import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import HelpText from './HelpText';

type NumberInputProps = {
  max?: number;
  helpText?: React.ReactNode;
  id: string;
};

const NumberInput = ({ max = 25, helpText, id }: NumberInputProps) => {
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    setCount(0);
    setWarning('');
  }, [max]);

  function updateState(newValue: number) {
    if (newValue <= max) {
      setWarning('');
      setCount(newValue);
    }
    if (newValue === max) {
      setWarning('Max antall sengeplaser nådd');
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newValue = Number(event.currentTarget.value);
    updateState(newValue);
  };

  return (
    <div className="w-full">
      <input
        id={id}
        name={id}
        onChange={handleChange}
        type="number"
        max={max}
        className="align-text-bottom shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-1/3 sm:text-sm border border-gray-300 rounded-md inline-flex mr-3"
        value={count}
      />
      <button
        className="mr-1 align-super inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        onClick={() => updateState(count + 1)}
      >
        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => updateState(count - 1)}
        className="align-super inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      {warning ? (
        <HelpText className="text-orange-500">{warning}</HelpText>
      ) : (
        helpText
      )}
    </div>
  );
};

export default NumberInput;
