import api from './axios';

export interface CreateBookingRequest {
  clientName: string;
  clientEmail: string;
  haircutId: number;
  dateTimeSlot: string;
}
export interface Booking {
    id: number;
    clientEmail: string;
    haircutName: string;
    dateTimeSlot: string;
  }

export const createBooking = async (request: CreateBookingRequest) => {
  const response = await api.post('/bookings', request);
  return response.data;
};
export const getAllBookings = async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>('/bookings');
    return response.data;
  };