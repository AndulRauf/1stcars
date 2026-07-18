type ToastType = "success" | "info" | "error";

interface ToastEvent {
  message: string;
  type: ToastType;
}

type ToastListener = (event: ToastEvent) => void;
const toastListeners = new Set<ToastListener>();

export const toast = {
  success: (message: string) => {
    toastListeners.forEach((listener) => listener({ message, type: "success" }));
  },
  error: (message: string) => {
    toastListeners.forEach((listener) => listener({ message, type: "error" }));
  },
  info: (message: string) => {
    toastListeners.forEach((listener) => listener({ message, type: "info" }));
  },
  subscribe: (listener: ToastListener) => {
    toastListeners.add(listener);
    return () => {
      toastListeners.delete(listener);
    };
  }
};
