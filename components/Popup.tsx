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
  Dimensions,
  Platform,
} from "react-native";

interface PopupData {
  visible: boolean;
  message: React.ReactNode;
  actions?: Array<PopupAction>;
}

interface PopupAction {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

interface PopupManagerProps {
  popups: Record<string, PopupData>;
  onClose: (popupKey: string) => void;
  modalStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  messageStyle?: TextStyle;
}

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

const PopupManager: React.FC<PopupManagerProps> = ({
  popups,
  onClose,
  modalStyle,
  contentStyle,
  messageStyle,
}) => {
  const visibleEntry = Object.entries(popups).find(([_, v]) => v.visible);
  if (!visibleEntry) return null;

  const [popupKey, popupData] = visibleEntry;
  const { message, actions } = popupData;

  return (
    <Modal
      transparent
      visible={popupData.visible}
      animationType="fade"
      onRequestClose={() => onClose(popupKey)}
      statusBarTranslucent={true}
    >
      {/* Full-screen root so centering works on all platforms */}
      <View style={[styles.modalRoot, modalStyle]}>
        {/* Overlay: absolutely fills the screen and captures taps */}
        <TouchableWithoutFeedback onPress={() => onClose(popupKey)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        {/* Content container centered by the root view */}
        <View style={[styles.contentWrapper]}>
          <View style={[styles.modalContent, contentStyle]}>
            {React.isValidElement(message) ? (
              message
            ) : (
              <Text style={[styles.messageText, messageStyle]}>{message}</Text>
            )}

            {actions &&
              actions.map((action, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.actionButton, action.style]}
                  onPress={action.onPress}
                >
                  <Text style={styles.actionButtonText}>{action.label}</Text>
                </TouchableOpacity>
              ))}

            <TouchableOpacity style={styles.closeButton} onPress={() => onClose(popupKey)}>
              <MaterialIcons name="close" color={"#969696"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const usePopupManager = () => {
  const [popups, setPopups] = React.useState<Record<string, PopupData>>({});

  interface ShowPopupParams {
    popupKey: string;
    message: React.ReactNode;
    actions?: Array<PopupAction>;
  }

  const showPopup = ({ popupKey, message, actions }: ShowPopupParams) => {
    setPopups((prev) => ({
      ...prev,
      [popupKey]: { visible: true, message, actions },
    }));
  };

  const hidePopup = (popupKey: string) => {
    setPopups((prev) => ({
      ...prev,
      [popupKey]: { ...prev[popupKey], visible: false },
    }));
  };

  const hideAllPopups = () => {
    setPopups((prev) => {
      const out: Record<string, PopupData> = {};
      Object.keys(prev).forEach((k) => {
        out[k] = { ...prev[k], visible: false };
      });
      return out;
    });
  };

  return { popups, showPopup, hidePopup, hideAllPopups };
};

const styles = StyleSheet.create({
  // full-screen root
  modalRoot: {
    flex: 1,
    justifyContent: "center", // centers vertically
    alignItems: "center",
  },

  // overlay covers entire screen
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    // ensure overlay sits behind content but still receives touches
    zIndex: 0,
  },

  // wrapper to ensure centered content gets space (keeps content above overlay)
  contentWrapper: {
    zIndex: 2,
    // allow content to size naturally but keep centered
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },

  modalContent: {
    minHeight: 120, // prevent collapse to tiny height
    maxWidth: Math.min(420, SCREEN_W - 40),
    width: Math.min(420, SCREEN_W - 80),
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    // shadows
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  messageText: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },

  closeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    padding: 6,
    borderRadius: 6,
  },

  actionButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    alignSelf: "stretch",
  },

  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
});

export default PopupManager;
