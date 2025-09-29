import { Text, StyleSheet } from "react-native";
import Colors from "../Utilities/colors";

function InstructionText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  text: {
    color: Colors.accent500,
    fontSize: 24,
    fontFamily: "open-sans",
  },
});
