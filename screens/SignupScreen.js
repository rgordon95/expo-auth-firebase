import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { AuthContext } from "../store/auth-context";

import { createUser } from "../util/auth";

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const signUpHandler = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token)
    } catch (error) {
      console.error(error);
      Alert.alert("Authentication failed!", "Please try again later", [
        { text: "Okay" },
      ]);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingOverlay message="creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
