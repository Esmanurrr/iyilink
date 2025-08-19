import { toast } from "react-toastify";

export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    ...options,
  });
};

export const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    autoClose: 3000,
    hideProgressBar: true,
    closeButton: false,
    ...options,
  });
};

export const showInfoToast = (message, options = {}) => {
  toast.info(message, {
    autoClose: 2500,
    hideProgressBar: true,
    closeButton: false,
    ...options,
  });
};

export const showWarningToast = (message, options = {}) => {
  toast.warn(message, {
    autoClose: 3000,
    hideProgressBar: true,
    closeButton: false,
    ...options,
  });
};
