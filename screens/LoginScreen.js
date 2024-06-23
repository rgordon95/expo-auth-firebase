import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { AuthContext } from "../store/auth-context";

import { signIn } from "../util/auth";

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const signInHandler = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const token = await signIn(email, password);
      authCtx.authenticate(token.data.idToken);
    } catch (error) {
      Alert.alert("Authentication failed!", "Please check your credentials", [
        { text: "Okay" },
      ]);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="creating user..." />;
  }

  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;
