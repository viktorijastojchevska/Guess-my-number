import { Text, StyleSheet } from "react-native";
import Colors from "../Utilities/colors";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fonfamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    padding: 12,
    borderWidth: 2,
    borderColor: "white",
  },
});
