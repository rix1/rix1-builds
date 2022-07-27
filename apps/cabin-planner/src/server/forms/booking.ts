import dayjs from 'dayjs';
import { z } from 'zod';

export const bookingSchema_client = z.object({
  selectedDates: z.array(z.string()).min(2).max(2),
  selectedUser: z.object({
    id: z.string(),
    name: z.string().nullish(),
    email: z.string(),
  }),
  selectedProperty: z.object({
    id: z.string(),
    name: z.string(),
    beds: z.number(),
  }),
  about: z.string(),
  bedCount: z.string(),
  arrivalTime: z.string(),
});

export function validateBooking_client(data: any) {
  const validForm = bookingSchema_client.parse(data);
  const startDate = dayjs(validForm.selectedDates[0]);
  const [hours, minutes] = validForm.arrivalTime.split(':');
  return {
    startDate: startDate.toISOString(),
    endDate: dayjs(validForm.selectedDates[1]).toISOString(),
    userId: validForm.selectedUser.id,
    propertyId: validForm.selectedProperty.id,
    description: validForm.about,
    bedCount: Number(validForm.bedCount),
    arrivalTime: startDate
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
