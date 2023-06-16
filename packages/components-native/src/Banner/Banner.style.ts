import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  error: {
    backgroundColor: tokens["color-critical--surface"],
  },
  warning: {
    backgroundColor: tokens["color-warning--surface"],
  },
  notice: {
    backgroundColor: tokens["color-informative--surface"],
  },
});