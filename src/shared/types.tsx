// For UserType
export interface UserType {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// For CampsiteType
export interface CampsiteType {
  _id?: string;
  userId: string;
  name: string;
  city: string;
  state: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls?: string[];
  lastUpdated: Date;
  bookings?: BookingType[]; 
}

// For BookingType
export interface BookingType {
  _id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
}

// For CampsiteSearchResponse
export interface CampsiteSearchResponse {
  data: CampsiteType[]; 
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
