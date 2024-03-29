import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Fragment, useState } from 'react';

interface ComboboxProps<T> {
  options: T[] | undefined;
  selected: T | undefined;
  onChange: (option: T) => void;
  id: string;
}

function Combobox<
  T extends {
    id: string;
    name: string | null;
  },
>({ id, options, selected, onChange }: ComboboxProps<T>) {
  const [query, setQuery] = useState('');

  const filteredItems =
    query === '' || !options
      ? options
      : options.filter((item) => {
          if (!item.name) {
            return false;
          }
          return item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''));
        });

  return (
    <div className="w-72">
      <HeadlessCombobox value={selected} onChange={onChange}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default">
            <HeadlessCombobox.Input
              id={id}
              className={clsx(
                'w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 ring-1 focus:ring-2 rounded-md ring-gray-300',
              )}
              displayValue={(option: typeof Option) => option?.name}
              onChange={(event) => setQuery(event.target.value)}
            />

            <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </HeadlessCombobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <HeadlessCombobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItems?.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems?.map((item) => (
                  <HeadlessCombobox.Option
                    key={item.id}
                    className={({ active }) =>
                      clsx(
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                        active
                          ? 'bg-indigo-200 text-gray-900'
                          : 'text-gray-900',
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </HeadlessCombobox.Option>
                ))
              )}
            </HeadlessCombobox.Options>
          </Transition>
        </div>
      </HeadlessCombobox>
    </div>
  );
}

export default Combobox;
