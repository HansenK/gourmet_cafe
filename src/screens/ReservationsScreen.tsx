import React from "react";
import { View } from "react-native";
import { Text, ActivityIndicator, Divider, Button, Icon } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { isPast } from "date-fns";

import ScreenLayout from "./ScreenLayout";
import { supabase } from "../lib/supabase";
import ReservationItem from "../components/reervations/ReservationItem";
import useMe from "../hooks/useMe";

const ReservationsScreen = () => {
  const navigation = useNavigation();
  const { data: me } = useMe();
  const myUserId = me?.id;

  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      return supabase
        .from("reservations")
        .select()
        .eq("user_id", myUserId!)
        .then((res) => res.data || []);
    },
    enabled: !!myUserId,
  });

  const pastReservations = React.useMemo(
    () => reservations.filter((reservation) => isPast(new Date(reservation.date))),
    [reservations]
  );
  const futureReservations = React.useMemo(
    () => reservations.filter((reservation) => !isPast(new Date(reservation.date))),
    [reservations]
  );

  const userHasFutureAndPastReservations = futureReservations.length > 0 && pastReservations.length > 0;

  return (
    <ScreenLayout>
      {isLoading && <ActivityIndicator style={{ marginVertical: 20 }} />}

      {reservations.length === 0 && !isLoading && (
        <View style={{ marginTop: 25, marginBottom: 25, alignItems: "center", justifyContent: "center", gap: 10 }}>
          <Icon source="image-filter-none" size={30} />
          <Text style={{ textAlign: "center" }}>Nenhuma reserva encontrada.</Text>
        </View>
      )}

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

          {futureReservations.length > 0 && (
            <View style={{ gap: 10 }}>
              <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                Reservas Futuras
              </Text>

              {futureReservations.map((reservation) => (
                <ReservationItem key={reservation.id} reservation={reservation} />
              ))}
            </View>
          )}

          {userHasFutureAndPastReservations && <Divider bold style={{ marginVertical: 10 }} />}

          {pastReservations.length > 0 && (
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
          )}
        </View>
      )}
    </ScreenLayout>
  );
};

export default ReservationsScreen;
