import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";

// Updated component to handle multiple popups
interface PopupData {
  visible: boolean;
  message: string;
}

interface PopupManagerProps {
  popups: Record<string, PopupData>;
  onClose: (popupKey: string) => void;
}

const PopupManager: React.FC<PopupManagerProps> = ({ popups, onClose }) => {
  // Get the first visible popup (you could modify this to show multiple if needed)
  const visiblePopup = Object.entries(popups).find(([key, value]) => value.visible);

  if (!visiblePopup) return null;

  const [popupKey, popupData] = visiblePopup;
  const { message } = popupData;

  return (
    <Modal transparent={true} visible={true} onRequestClose={() => onClose(popupKey)}>
      <Pressable onPress={() => onClose(popupKey)}>
        <View style={styles.modalOverlay} />
      </Pressable>
      <View style={styles.modalContent}>
        <Text style={styles.messageText}>{message}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => onClose(popupKey)}>
          <Text style={styles.closeButtonText}>Close</Text>
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
    message: string;
  }

  const showPopup = ({ popupKey, message }: ShowPopupParams): void => {
    setPopups((prev) => ({
      ...prev,
      [popupKey]: { visible: true, message },
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

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translateX(-50%) translateY(-50%)",
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
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PopupManager;
