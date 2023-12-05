import React from "react";
import { TextInput, RadioButton, Text, Button, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

import ScreenLayout from "./ScreenLayout";
import { ReservationPeriod, ReservationType } from "../types/reservations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const RESERVATION_TYPE_OPTIONS: { id: number; label: string; value: ReservationType }[] = [
  { id: 1, label: "Evento", value: "event" },
  { id: 2, label: "Remote Office", value: "remote_office" },
];

const RESERVATION_PERIOD_OPTIONS: { id: number; label: string; value: ReservationPeriod }[] = [
  { id: 1, label: "Manhã", value: "morning" },
  { id: 2, label: "Tarde", value: "evening" },
];

const ReservationScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [numberOfPeople, setNumberOfPeople] = React.useState<number | null>(null);
  const [selectedReservationTypeId, setSelectedReservationTypeId] = React.useState<number | null>(1);
  const [selectedReservationPeriodId, setSelectedReservationPeriodId] = React.useState<number | null>(1);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const { mutate: createReservation, isPending: isSubmitting } = useMutation({
    mutationFn: async () => {
      const period = RESERVATION_PERIOD_OPTIONS.find((period) => period.id === selectedReservationPeriodId)!.value;
      const type = RESERVATION_TYPE_OPTIONS.find((type) => type.id === selectedReservationTypeId)!.value;

      return supabase.from("reservations").insert({
        number_of_people: numberOfPeople || 0,
        period,
        type,
        date: selectedDate!.toLocaleString(),
      });
    },
    onSuccess: () => {
      navigation.navigate("Reservations");
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  return (
    <ScreenLayout>
      <View style={{ gap: 10 }}>
        <Button icon="calendar" onPress={() => setShowDatePicker(true)} mode="outlined" buttonColor="white">
          <Text>{selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Escolher Data"}</Text>
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            is24Hour
            mode="date"
            onChange={(_, date) => {
              setSelectedDate(date || null);
              setShowDatePicker(false);
            }}
          />
        )}

        <TextInput
          label="Quantidade de pessoas"
          mode="outlined"
          placeholder="Quantas pessoas?"
          keyboardType="numeric"
          maxLength={2}
          value={numberOfPeople === null ? "" : String(numberOfPeople)}
          onChange={(text) => {
            const numberValue = Number(text.nativeEvent.text);
            if (!isNaN(numberValue) && (numberValue >= 0 || text.nativeEvent.text === "")) {
              setNumberOfPeople(text.nativeEvent.text === "" ? null : numberValue);
            }
          }}
        />

        <View style={{ gap: 5 }}>
          <Text variant="titleMedium">Tipo de reserva</Text>
          <RadioButton.Group
            onValueChange={(value) => setSelectedReservationTypeId(Number(value))}
            value={String(selectedReservationTypeId)}
          >
            {RESERVATION_TYPE_OPTIONS.map((reservationType) => (
              <View key={reservationType.id} style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value={String(reservationType.id)} />
                <Text>{reservationType.label}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>

        <View style={{ gap: 5 }}>
          <Text variant="titleMedium">Periodo</Text>
          <RadioButton.Group
            onValueChange={(value) => setSelectedReservationPeriodId(Number(value))}
            value={String(selectedReservationPeriodId)}
          >
            {RESERVATION_PERIOD_OPTIONS.map((eventPeriod) => (
              <View key={eventPeriod.id} style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value={String(eventPeriod.id)} />
                <Text>{eventPeriod.label}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>

        <Button
          disabled={isSubmitting || !selectedDate}
          mode="contained"
          icon="calendar-plus"
          onPress={() => createReservation()}
          textColor={selectedDate && !isSubmitting ? "white" : "gray"}
        >
          <Text style={{ color: selectedDate && !isSubmitting ? "white" : "gray" }}>
            {isSubmitting ? "Carregando..." : "Reservar"}
          </Text>
        </Button>
      </View>
    </ScreenLayout>
  );
};

export default ReservationScreen;
