import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../Utilities/colors";
import Title from "../components/Title";
import InstructionText from "../components/InstructionText";
import PrimaryButton from "../components/PrimaryButton";

function GameOverScreen({ userNumber, roundsNumber, onStartNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/Images/success.png")}
        />
      </View>
      <InstructionText style={styles.instructionText}>
        Your phone needed <Text style={styles.spanText}> {roundsNumber} </Text>
        rounds to guess the number
        <Text style={styles.spanText}> {userNumber}</Text>
      </InstructionText>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  instructionText: {
    color: Colors.dark,
    fontSize: 18,
    marginLeft: 24,
    marginRight: 24,
    textAlign: "center",
    fontFamily: "open-sans",
    marginBottom: 24,
  },

  spanText: {
    color: Colors.primary500,
    fontFamily: "open-sans-bold",
  },
});
