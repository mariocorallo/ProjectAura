
/**
 * Utilità per gestire i contatti via email in modo robusto, especially for PWAs.
 * Implementa la "Soluzione 2" (fallback su Gmail Web se mailto fallisce).
 */
export const handleEmailContact = (subject: string = "Aura App - Contatto") => {
  const email = "mariocorallo@gmail.com";
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject)}`;

  // 1. Prova il mailto classico
  window.location.href = mailtoUrl;

  // 2. Fallback dopo un breve delay: apri Gmail web in una nuova scheda
  // Se il sistema ha aperto l'app di posta, l'utente vedrà quella. 
  // Altrimenti, questa scheda caricherà Gmail Web come backup.
  setTimeout(() => {
    window.open(gmailUrl, "_blank");
  }, 1000);
};
