import React from "react";
import { View } from "react-native";
import { Text, ActivityIndicator, Divider, Button } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { isPast } from "date-fns";

import ScreenLayout from "./ScreenLayout";
import { supabase } from "../lib/supabase";
import ReservationItem from "../components/reervations/ReservationItem";

const ReservationsScreen = () => {
  const navigation = useNavigation();

  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      return supabase
        .from("reservations")
        .select()
        .then((res) => res.data || []);
    },
  });

  const pastReservations = React.useMemo(
    () => reservations.filter((reservation) => isPast(new Date(reservation.date))),
    [reservations]
  );
  const futureReservations = React.useMemo(
    () => reservations.filter((reservation) => !isPast(new Date(reservation.date))),
    [reservations]
  );

  return (
    <ScreenLayout>
      {isLoading && <ActivityIndicator style={{ marginVertical: 20 }} />}
      {!isLoading && (
        <View style={{ gap: 10 }}>
          <Button
            mode="contained"
            icon="calendar-plus"
            onPress={() => navigation.navigate("ReservationScreen")}
            style={{ marginBottom: 10 }}
          >
            <Text style={{ color: "white" }}>Nova Reserva</Text>
          </Button>

          <View style={{ gap: 10 }}>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
              Reservas Futuras
            </Text>

            {futureReservations.map((reservation) => (
              <ReservationItem key={reservation.id} reservation={reservation} />
            ))}
          </View>

          <Divider bold style={{ marginVertical: 10 }} />

          <View style={{ gap: 10 }}>
            <View style={{ gap: 5 }}>
              <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                Reservas passadas
              </Text>

              {pastReservations.map((reservation) => (
                <ReservationItem key={reservation.id} reservation={reservation} />
              ))}
            </View>
          </View>
        </View>
      )}
    </ScreenLayout>
  );
};

export default ReservationsScreen;
