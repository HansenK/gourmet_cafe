import { Database } from "../../database.types";

export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
export type ReservationPeriod = Database["public"]["Enums"]["reservation_period"];
export type ReservationType = Database["public"]["Enums"]["reservation_type"];
