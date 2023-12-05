import { RefreshControl, ScrollView } from "react-native";

interface AppScreenProps {
  children: React.ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const ScreenLayout = ({ children, refreshing = false, onRefresh }: AppScreenProps) => {
  return (
    <ScrollView style={{ padding: 10 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {children}
    </ScrollView>
  );
};

export default ScreenLayout;
