import dayjs from 'dayjs';
import { z } from 'zod';

export const bookingSchema_client = z.object({
  selectionStart: z.string().min(2, {
    message: 'Velg til-dato for oppholdet. Klikk på kalenderen for å velge.',
  }),
  selectionEnd: z.string().min(2, {
    message: 'Velg fra-dato for oppholdet. Klikk på kalenderen for å velge.',
  }),
  selectedUser: z.object(
    {
      id: z.string(),
      name: z.string().nullish(),
      email: z.string(),
    },
    {
      required_error: 'Vennligst fortell oss hvem som booker oppholdet.',
    },
  ),
  selectedProperty: z.object({
    id: z.string(),
    name: z.string(),
    beds: z.number(),
  }),
  about: z.string(),
  bedCount: z.number().min(1, {
    message:
      'Prøver du å booke et opphold uten sengeplass? Dette er for øyeblikket ikke støttet.',
  }),
  arrivalTime: z.string(),
});

export function validateBooking_client(data: any) {
  const validForm = bookingSchema_client.parse(data);
  const [hours, minutes] = validForm.arrivalTime.split(':');
  return {
    startDate: validForm.selectionStart,
    endDate: validForm.selectionEnd,
    userId: validForm.selectedUser.id,
    propertyId: validForm.selectedProperty.id,
    description: validForm.about,
    bedCount: Number(validForm.bedCount),
    arrivalTime: dayjs(validForm.selectionStart)
      .set('hour', Number(hours))
      .set('minutes', Number(minutes))
      .toISOString(),
  };
}

export const bookingSchema_server = z.object({
  startDate: z.string(),
  endDate: z.string(),
  userId: z.string(),
  propertyId: z.string(),
  description: z.string(),
  bedCount: z.number(),
  arrivalTime: z.string(),
});

export function validateBooking_server(
  data: ReturnType<typeof validateBooking_client>,
) {
  const cleanedForm = bookingSchema_server.parse(data);
  return cleanedForm;
}
