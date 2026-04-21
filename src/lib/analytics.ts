import ReactGA from "react-ga4";

const MEASUREMENT_ID = (import.meta as any).env.VITE_GA_MEASUREMENT_ID || "G-VJZFRQ6RYM";

export const initGA = () => {
  if (MEASUREMENT_ID) {
    ReactGA.initialize(MEASUREMENT_ID);
  }
};

export const trackPageView = (path: string, title?: string) => {
  if (MEASUREMENT_ID) {
    ReactGA.send({ hitType: "pageview", page: path, title: title || path });
  }
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (MEASUREMENT_ID) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};
