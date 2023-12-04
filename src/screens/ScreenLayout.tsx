import { ScrollView } from "react-native";

interface AppScreenProps {
  children: React.ReactNode;
}

const ScreenLayout = ({ children }: AppScreenProps) => {
  return <ScrollView style={{ padding: 10 }}>{children}</ScrollView>;
};

export default ScreenLayout;
