import React from 'react';
import useCalendar from '../hooks/useCalendar';
import titleCase from '../utils/titleCase';
import Calendar from './Calendar';
import Combobox from './Combobox';
import NumberInput from './NumberInput';

const BookingForm = () => {
  const [currentDate, days, eventHandlers, selectedDates] = useCalendar();
  const { handleNext, handlePrev, handleDateSelection } = eventHandlers;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log('form submitted', event.currentTarget);
  }

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
                      <div className="mt-1">
                        <Combobox />
                      </div>

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
                            placeholder="Jeg skal til X for å (...) og jeg får besøk av..."
                            defaultValue={''}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500 w-full md:w-2/3">
                          Kort beskrivelse av hytteturen. Gjør det lettere for
                          andre å planlegge om de kan komme innom eller ei.
                        </p>
                      </div>
                      <div className="mt-6">
                        <label
                          htmlFor="count"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Antall sengeplasser
                        </label>
                        <div className="mt-1">
                          <NumberInput />
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
                    Book hytte
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
