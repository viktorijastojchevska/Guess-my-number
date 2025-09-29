import { StyleSheet, View, Alert, FlatList, Text } from "react-native";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Utilities/colors";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minimumBoundary = 1;
let maximumBoundary = 100;

function GameScreen({ userNumber, onGameIsOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameIsOver(rounds.length);
    }
  }, [currentGuess, userNumber, onGameIsOver]);

  useEffect(() => {
    minimumBoundary = 1;
    maximumBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maximumBoundary = currentGuess;
    } else {
      minimumBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minimumBoundary,
      maximumBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setRounds((prevRounds) => [...prevRounds, newRndNumber]);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.istructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>

      <FlatList
        style={styles.listContainer}
        contentContainerStyle={{ paddingBottom: 24 }}
        data={rounds}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <View style={styles.listItemContainer}>
            <Text style={styles.listItemText}>
              #{index + 1} Opponent's Guess: {item}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  istructionText: {
    marginBottom: 12,
  },
  buttonsContainer: { flexDirection: "row" },
  buttonContainer: { flex: 1 },

  listContainer: {
    flex: 1,
    marginTop: 12,
  },

  listItemContainer: {
    color: "black",
    marginTop: 12,
  },

  listItemText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,

    color: Colors.dark,
    borderRadius: 30,
    padding: 12,
    backgroundColor: Colors.accent500,
    borderColor: Colors.primary800,
    borderWidth: 2,
    textAlign: "center",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
