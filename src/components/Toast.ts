import { showMessage, hideMessage } from "react-native-flash-message";
import {StatusBar} from 'react-native';

export default function showToast(
  message: string,
  type: 'info' | 'success' | 'danger',
) {
  showMessage({
    message: "Attention!",
    description: message,
    icon:type,
    type,
    hideStatusBar:true,
    statusBarHeight: StatusBar.currentHeight
  });
}

export function hideToast() {
  hideMessage()
}

export function showErrorToast(message: string) {
  showToast(message, 'danger');
}

export function showSuccessToast(message: string) {
  showToast(message, 'success');
}

export function showInfoToast(message: string) {
  showToast(message, 'info');
}
