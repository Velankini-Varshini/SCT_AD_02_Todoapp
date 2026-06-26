import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  title: string;
  active: boolean;
  onPress: () => void;
}

export default function FilterButton({
  title,
  active,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        active && styles.activeButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          active && styles.activeText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  buttonDark: {
    backgroundColor: "#2A2A2A",
  },

  activeButton: {
    backgroundColor: "#5B67CA",
  },

  text: {
    color: "#444",
    fontWeight: "600",
  },

  activeText: {
    color: "white",
  },
});