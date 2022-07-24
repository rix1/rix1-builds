import { Property } from '@prisma/client';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import useCalendar from '../hooks/useCalendar';
import titleCase from '../utils/titleCase';
import { trpc } from '../utils/trpc';
import Calendar from './Calendar';
import Combobox from './Combobox';
import HelpText from './HelpText';
import NumberInput from './NumberInput';

const BookingForm = () => {
  const { status, data: properties } = trpc.useQuery(['property.getAll']);
  const [currentDate, days, eventHandlers, selectedDates] = useCalendar();
  const { handleNext, handlePrev, handleDateSelection } = eventHandlers;
  const [selectedLocation, setSelectedLocation] = useState<
    Property | undefined
  >(undefined);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log('form submitted', event.currentTarget);
  }

  useEffect(() => {
    if (Array.isArray(properties) && !selectedLocation) {
      setSelectedLocation(properties[0]);
    }
  }, [properties, selectedLocation]);

  return (
    <>
      <div>
        <div className="">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Book et hyttebesøk
            </h3>
            <p className="mt-1 text-sm text-gray-600 mb-8">
              Fyll ut skjemaet for å booke deg inn på en hytte, leilighet eller
              hus.
            </p>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-8">
                    <div className="text-center col-span-3 md:col-span-1">
                      <Calendar.CalendarActions
                        onNextMonth={handleNext}
                        onPrevMonth={handlePrev}
                      >
                        {titleCase(currentDate.format('MMMM YYYY'))}
                      </Calendar.CalendarActions>
                      <Calendar.CalendarHeader
                        className="mt-5"
                        daysToRender={days}
                      />
                      <Calendar.CalendarGrid
                        onSelected={handleDateSelection}
                        selectedMonth={currentDate.month()}
                        daysToRender={days}
                      />
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700 leading-normal"
                      >
                        Velg sted
                      </label>
                      <div className="mt-1 relative">
                        <Combobox
                          onChange={setSelectedLocation}
                          options={properties}
                          selected={selectedLocation}
                        />
                        {['idle', 'loading'].includes(status) && (
                          <svg
                            className="animate-spin absolute h-5 w-5 text-indigo-700 top-2 ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                      </div>
                      <HelpText>
                        Sengeplasser tilgjengelig:{' '}
                        {selectedLocation?.beds || '0'}
                      </HelpText>

                      <div className="mt-6">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Beskrivelse
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full md:w-2/3 sm:text-sm border border-gray-300 rounded-md"
                            placeholder={`Jeg skal til ${selectedLocation?.name} for å (...) og jeg får besøk av...`}
                            defaultValue={''}
                          />
                        </div>
                        <HelpText className="md:w-2/3">
                          Gjør det lettere for andre å planlegge om de kan komme
                          innom eller ei.
                        </HelpText>
                      </div>
                      <div className="mt-6">
                        <label
                          htmlFor="count"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Sengeplasser
                        </label>
                        <div className="mt-1">
                          <NumberInput
                            max={selectedLocation?.beds}
                            helpText={
                              <HelpText className="md:w-1/3">
                                Hvor mange senger trenger du?
                              </HelpText>
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Book opphold
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
