import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

type NumberInputProps = {
  // children: React.ReactNode;
};

const NumberInput = ({}: NumberInputProps) => {
  const [count, setCount] = useState(0);
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCount(Number(event.currentTarget.value));
  };
  const handleButtonClick =
    (type: 'add' | 'subtract') =>
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (type === 'add') {
        setCount((prev) => prev + 1);
      }
      if (type === 'subtract') {
        setCount((prev) => prev + 1);
      }
    };
  return (
    <div className="w-full">
      <input
        onChange={handleChange}
        id="count"
        name="count"
        type="number"
        className="align-text-bottom shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-1/3 sm:text-sm border border-gray-300 rounded-md inline-flex mr-3"
        value={count}
      />
      <button
        className="mr-1 align-super inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        onClick={() => setCount((prev) => prev + 1)}
      >
        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => setCount((prev) => prev - 1)}
        className="align-super inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default NumberInput;
