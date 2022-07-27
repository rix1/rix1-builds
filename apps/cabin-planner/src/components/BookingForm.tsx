import { Property, User } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useCalendar from '../hooks/useCalendar';
import { validateBooking_client } from '../server/forms/booking';
import titleCase from '../utils/titleCase';
import { trpc } from '../utils/trpc';
import wait from '../utils/wait';
import Calendar from './Calendar';
import Combobox from './Combobox';
import HelpText from './HelpText';
import NumberInput from './NumberInput';
import Spinner from './Spinner';

const BookingForm = () => {
  const { status: propertyStatus, data: properties } = trpc.useQuery([
    'property.getAll',
  ]);

  const mutation = trpc.useMutation('booking.create');
  const { status: userStatus, data: users } = trpc.useQuery(['user.getAll']);

  const [currentDate, days, eventHandlers, selectedDates] = useCalendar();
  const { handleNext, handlePrev, handleDateSelection } = eventHandlers;

  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [selectedProperty, setSelectedProperty] = useState<
    Property | undefined
  >(undefined);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // @ts-ignore
    const about: string = event.currentTarget.about.value;
    // @ts-ignore
    const bedCount: string = event.currentTarget.bedCount.value;
    // @ts-ignore
    const arrivalTime: string = event.currentTarget.arrivalTime.value;

    const data = {
      selectedDates: selectedDates.map((date) => date.toISOString()),
      selectedUser,
      selectedProperty,
      about,
      bedCount,
      arrivalTime,
    };

    const cleaned = validateBooking_client(data);

    toast.promise(mutation.mutateAsync(cleaned), {
      loading: 'Booker opphold...',
      success: 'Oppholdet er booket!',
      error: 'En feil har oppstått',
    });
  };

  useEffect(() => {
    if (Array.isArray(properties) && !selectedProperty) {
      setSelectedProperty(properties[0]);
    }
  }, [properties, selectedProperty]);

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
            <form onSubmit={onSubmit}>
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
                    <div className="col-span-3 md:col-span-2 space-y-6">
                      <div>
                        <label
                          htmlFor="selectUser"
                          className="block text-sm font-medium text-gray-700 leading-normal"
                        >
                          Hvem er du?
                        </label>
                        <div className="mt-1 relative z-10">
                          <Combobox
                            id="selectUser"
                            onChange={setSelectedUser}
                            options={users}
                            selected={selectedUser}
                          />
                          {['idle', 'loading'].includes(userStatus) && (
                            <Spinner className="absolute text-indigo-700 top-2 ml-2" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="selectProperty"
                          className="block text-sm font-medium text-gray-700 leading-normal"
                        >
                          Velg sted
                        </label>
                        <div className="mt-1 relative">
                          <Combobox
                            id="selectProperty"
                            onChange={setSelectedProperty}
                            options={properties}
                            selected={selectedProperty}
                          />
                          {['idle', 'loading'].includes(propertyStatus) && (
                            <Spinner className="absolute text-indigo-700 top-2 ml-2" />
                          )}
                        </div>
                        <HelpText>
                          Sengeplasser tilgjengelig:{' '}
                          {selectedProperty?.beds || '0'}
                        </HelpText>
                      </div>

                      <div>
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
                            placeholder={`Jeg skal til ${selectedProperty?.name} for å (...) og jeg får besøk av...`}
                            defaultValue={''}
                            required
                          />
                        </div>
                        <HelpText className="md:w-2/3">
                          Gjør det lettere for andre å planlegge om de kan komme
                          innom eller ei.
                        </HelpText>
                      </div>
                      <div>
                        <label
                          htmlFor="bedCount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Sengeplasser
                        </label>
                        <div className="mt-1">
                          <NumberInput
                            id="bedCount"
                            max={selectedProperty?.beds}
                            helpText={
                              <HelpText className="md:w-1/3">
                                Hvor mange senger trenger du/dere?
                              </HelpText>
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="arrivalTime"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ankomsttidspunkt
                        </label>
                        <div className="mt-1">
                          <input
                            id="arrivalTime"
                            name="arrivalTime"
                            required
                            type="time"
                            min="08:00"
                            max="23:59"
                            step={60 * 60}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full md:w-1/3 sm:text-sm border border-gray-300 rounded-md"
                            defaultValue="17:00"
                          />
                        </div>
                        <HelpText className="md:w-1/3">
                          Aka. Kommer du til middag?
                        </HelpText>
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
