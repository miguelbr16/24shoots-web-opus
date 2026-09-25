export function buildMailtoLink(
  email: string,
  locale: "es" | "en"
): string {
  const subject =
    locale === "es"
      ? "Consulta 24Shoots Media"
      : "24Shoots Media enquiry";
  const body =
    locale === "es"
      ? "Hola,\n\nMe gustaría recibir información sobre:\n\n- Servicio:\n- Fecha aproximada:\n- Presupuesto orientativo:\n\nGracias."
      : "Hi,\n\nI would like information about:\n\n- Service:\n- Approximate date:\n- Budget:\n\nThank you.";

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
