import type { L } from "@/lib/i18n";
import { site } from "@/lib/site";

type Doc = { title: string; sections: { h: string; p: string[] }[] };

const PENDING = { es: "[pendiente de completar]", en: "[to be completed]" };
const holder = (l: "es" | "en") => site.legal.holder ?? PENDING[l];
const address = (l: "es" | "en") => site.legal.address ?? PENDING[l];

/**
 * Draft legal texts. PENDING: holder name and address, and review by 24SHOOTS' advisers
 * (in particular: no cookie banner because analytics is cookieless).
 */
export const legal: Record<"legal" | "privacy" | "cookies", L<Doc>> = {
  legal: {
    es: {
      title: "Aviso legal",
      sections: [
        {
          h: "Titular",
          p: [
            `En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE): titular del sitio, ${holder("es")}; NIF ${site.legal.taxId}; domicilio, ${address("es")}; email, ${site.contact.email}. Marca comercial: 24SHOOTS.`,
          ],
        },
        { h: "Objeto", p: ["Este sitio informa sobre los servicios de contenido y comunicación visual (vídeo, fotografía y producción) que se ofrecen bajo la marca 24SHOOTS."] },
        {
          h: "Propiedad intelectual",
          p: [
            "Los contenidos del sitio (textos, imágenes, vídeos, diseño y código) pertenecen al titular o a terceros que han autorizado su uso. Los trabajos del portfolio se muestran con fines de presentación profesional; las marcas y logotipos que aparecen en ellos pertenecen a sus respectivos titulares.",
          ],
        },
        { h: "Responsabilidad", p: ["El titular no se responsabiliza de interrupciones del servicio ni de los contenidos de sitios de terceros enlazados."] },
        { h: "Legislación", p: ["Se aplica la legislación española. Salvo norma imperativa en contrario, las partes se someten a los juzgados y tribunales de Valencia."] },
      ],
    },
    en: {
      title: "Legal notice",
      sections: [
        {
          h: "Owner",
          p: [
            `Under Spanish Law 34/2002 (LSSI-CE): website owner, ${holder("en")}; tax ID ${site.legal.taxId}; address, ${address("en")}; email, ${site.contact.email}. Trading name: 24SHOOTS.`,
          ],
        },
        { h: "Purpose", p: ["This website provides information about the content and visual communication services (film, photography and production) offered under the 24SHOOTS brand."] },
        {
          h: "Intellectual property",
          p: [
            "The site's content (text, images, video, design and code) belongs to the owner or to third parties who have authorised its use. Portfolio work is shown for professional presentation; brands and logos appearing in it belong to their respective owners.",
          ],
        },
        { h: "Liability", p: ["The owner is not responsible for service interruptions or for the content of linked third-party sites."] },
        { h: "Governing law", p: ["Spanish law applies. Unless mandatory rules state otherwise, the parties submit to the courts of Valencia, Spain."] },
      ],
    },
  },
  privacy: {
    es: {
      title: "Política de privacidad",
      sections: [
        { h: "Responsable", p: [`${holder("es")}, NIF ${site.legal.taxId}, ${address("es")}. Contacto: ${site.contact.email}.`] },
        {
          h: "Qué datos tratamos y para qué",
          p: [
            "Los datos que envías con el formulario de contacto (nombre, email, empresa, tipo de proyecto, fecha y mensaje), o por email, teléfono o WhatsApp, se usan solo para responder a tu solicitud y, si procede, preparar una propuesta.",
            "No usamos tus datos para enviarte comunicaciones comerciales ni los cedemos a terceros con esa finalidad.",
          ],
        },
        { h: "Base jurídica", p: ["La aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD) y nuestro interés legítimo en atender las consultas recibidas (art. 6.1.f RGPD)."] },
        {
          h: "Encargados del tratamiento",
          p: [
            "Vercel Inc. (alojamiento del sitio y medición anónima de visitas) y Resend (envío del formulario por email). Estos proveedores pueden tratar datos fuera del Espacio Económico Europeo con las garantías previstas en el RGPD (cláusulas contractuales tipo).",
            "Si nos escribes por WhatsApp, ese canal se rige también por las condiciones de WhatsApp (Meta).",
          ],
        },
        { h: "Conservación", p: ["Mientras dure la conversación sobre tu proyecto y, después, durante los plazos legales aplicables."] },
        {
          h: "Tus derechos",
          p: [`Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${site.contact.email}. También puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`],
        },
      ],
    },
    en: {
      title: "Privacy policy",
      sections: [
        { h: "Controller", p: [`${holder("en")}, tax ID ${site.legal.taxId}, ${address("en")}. Contact: ${site.contact.email}.`] },
        {
          h: "What data we process and why",
          p: [
            "The details you send through the contact form (name, email, company, type of project, date and message), or by email, phone or WhatsApp, are used only to reply to your enquiry and, where relevant, prepare a proposal.",
            "We do not use your data to send you marketing or share it with third parties for that purpose.",
          ],
        },
        { h: "Legal basis", p: ["Steps taken at your request prior to entering into a contract (Art. 6.1.b GDPR) and our legitimate interest in answering enquiries (Art. 6.1.f GDPR)."] },
        {
          h: "Processors",
          p: [
            "Vercel Inc. (hosting and anonymous visit measurement) and Resend (delivery of the form by email). These providers may process data outside the European Economic Area under the safeguards set out in the GDPR (standard contractual clauses).",
            "If you contact us on WhatsApp, that channel is also governed by WhatsApp's (Meta) terms.",
          ],
        },
        { h: "Retention", p: ["For as long as we are discussing your project and, afterwards, for the applicable legal periods."] },
        {
          h: "Your rights",
          p: [`You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${site.contact.email}. You may also complain to the Spanish Data Protection Agency (www.aepd.es).`],
        },
      ],
    },
  },
  cookies: {
    es: {
      title: "Política de cookies",
      sections: [
        {
          h: "No usamos cookies de seguimiento",
          p: [
            "Este sitio no instala cookies publicitarias, analíticas ni de terceros. Por eso no te mostramos un banner de consentimiento.",
            "Para saber cuántas personas visitan cada página y cómo se comporta el sitio usamos Vercel Web Analytics y Speed Insights, que funcionan sin cookies y sin identificarte: los datos se agregan y no permiten seguirte entre sitios ni entre visitas.",
          ],
        },
        { h: "Técnicas", p: ["El alojamiento (Vercel) puede usar mecanismos estrictamente necesarios para servir el sitio de forma segura. No requieren consentimiento."] },
        { h: "Enlaces externos", p: ["Los enlaces a Instagram o WhatsApp llevan a servicios de terceros, que aplican sus propias políticas cuando los visitas."] },
      ],
    },
    en: {
      title: "Cookie policy",
      sections: [
        {
          h: "We do not use tracking cookies",
          p: [
            "This site sets no advertising, analytics or third-party cookies. That is why there is no consent banner.",
            "To know how many people visit each page and how the site performs we use Vercel Web Analytics and Speed Insights, which work without cookies and without identifying you: data is aggregated and cannot follow you across sites or visits.",
          ],
        },
        { h: "Technical", p: ["Our host (Vercel) may use strictly necessary mechanisms to serve the site securely. These do not require consent."] },
        { h: "External links", p: ["Links to Instagram or WhatsApp lead to third-party services, which apply their own policies when you visit them."] },
      ],
    },
  },
};
