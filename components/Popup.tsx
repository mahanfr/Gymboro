import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";

// Interface for Popup Data
interface PopupData {
  visible: boolean;
  message: React.ReactNode; // Can accept any type of content (e.g., string, JSX)
  actions?: Array<PopupAction>; // List of actions with a label and handler
}

interface PopupAction {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle; // Custom style for the action button
}

interface PopupManagerProps {
  popups: Record<string, PopupData>;
  onClose: (popupKey: string) => void;
  modalStyle?: ViewStyle; // Override styles for the modal container
  contentStyle?: ViewStyle; // Override styles for the content inside the popup
  messageStyle?: TextStyle; // Override styles for the message text
}

const PopupManager: React.FC<PopupManagerProps> = ({
  popups,
  onClose,
  modalStyle,
  contentStyle,
  messageStyle,
}) => {
  // Get the first visible popup
  const visiblePopup = Object.entries(popups).find(([key, value]) => value.visible);

  if (!visiblePopup) return null;

  const [popupKey, popupData] = visiblePopup;
  const { message, actions } = popupData;

  return (
    <Modal transparent={true} visible={true} onRequestClose={() => onClose(popupKey)}>
      <TouchableWithoutFeedback onPress={() => onClose(popupKey)}>
        <View style={[styles.modalOverlay, modalStyle]} />
      </TouchableWithoutFeedback>

      <View style={[styles.modalContent, contentStyle]}>
        {React.isValidElement(message) ? (
          message
        ) : (
          <Text style={[styles.messageText, messageStyle]}>{message}</Text>
        )}

        {/* Render action buttons if any */}
        {actions &&
          actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionButton, action.style]}
              onPress={action.onPress}
            >
              <Text style={styles.actionButtonText}>{action.label}</Text>
            </TouchableOpacity>
          ))}

        <TouchableOpacity style={styles.closeButton} onPress={() => onClose(popupKey)}>
          <MaterialIcons name="close" color={"#969696"} size={28} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

// Hook to manage popup state
export const usePopupManager = () => {
  const [popups, setPopups] = React.useState<Record<string, PopupData>>({});

  interface ShowPopupParams {
    popupKey: string;
    message: React.ReactNode;
    actions?: Array<PopupAction>;
  }

  const showPopup = ({ popupKey, message, actions }: ShowPopupParams): void => {
    setPopups((prev) => ({
      ...prev,
      [popupKey]: { visible: true, message, actions },
    }));
  };

  const hidePopup = (popupKey: string): void => {
    setPopups((prev) => ({
      ...prev,
      [popupKey]: { ...prev[popupKey], visible: false },
    }));
  };

  const hideAllPopups = () => {
    const updatedPopups: Record<string, PopupData> = {};
    Object.keys(popups).forEach((key) => {
      updatedPopups[key] = { ...popups[key], visible: false };
    });
    setPopups(updatedPopups);
  };

  return { popups, showPopup, hidePopup, hideAllPopups };
};

// Styles
const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    paddingTop: 35,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    elevation: 2,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PopupManager;
