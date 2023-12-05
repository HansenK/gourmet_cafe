import { View } from "react-native";
import { Text } from "react-native-paper";
import { format } from "date-fns";

import { Reservation, ReservationPeriod, ReservationType } from "../../types/reservations";

interface ReservationItemProps {
  reservation: Reservation;
}

const RESERVATION_PERIOD_LAEBEL: Record<ReservationPeriod, string> = {
  evening: "Tarde",
  morning: "Manhã",
};

const RESERVATION_TYPE_LABEL: Record<ReservationType, string> = {
  event: "Evento",
  remote_office: "Remote Office",
};

const ReservationItem = ({ reservation }: ReservationItemProps) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "column", gap: 10 }}>
        <Text variant="titleSmall" style={{ fontWeight: "bold" }}>
          {`${format(new Date(reservation.date), "dd/MM/yyyy")} (${RESERVATION_PERIOD_LAEBEL[reservation.period]})`}
        </Text>
        <Text>
          {`${reservation.number_of_people} ${reservation.number_of_people === 1 ? "pessoa" : "pessoas"} (${
            RESERVATION_TYPE_LABEL[reservation.type]
          })`}
        </Text>
      </View>

      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Text variant="bodySmall">Mesa</Text>
        <Text variant="titleLarge" style={{ color: "green" }}>
          {reservation.table}
        </Text>
      </View>
    </View>
  );
};

export default ReservationItem;
