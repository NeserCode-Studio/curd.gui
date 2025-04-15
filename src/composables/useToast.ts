import { toast as T, ExternalToast } from "sonner";
import { useI18n } from ".";

export const useToast = (config?: ExternalToast) => {
  const { t } = useI18n();

  return {
    toast: (symbol: string, external?: ExternalToast) => {
      return T(t(symbol), { ...config, ...external });
    },
    info: (symbol: string, external?: ExternalToast) => {
      return T.info(t(symbol), { ...config, ...external });
    },
    success: (symbol: string, external?: ExternalToast) => {
      return T.success(t(symbol), { ...config, ...external });
    },
    error: (symbol: string, external?: ExternalToast) => {
      return T.error(t(symbol), { ...config, ...external });
    },
    warning: (symbol: string, external?: ExternalToast) => {
      return T.warning(t(symbol), { ...config, ...external });
    },
    dismiss: (id: string) => {
      return T.dismiss(id);
    },
  };
};
