import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [message, setMessage] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.authToken;

  useEffect(() => {
    axios
      .get("https://authdemo-e8d8e-default-rtdb.firebaseio.com/message.json?auth=" + token)
      .then((response) => {
        setMessage(response.data);
      }).catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
