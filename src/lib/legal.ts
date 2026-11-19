export type LegalBlock = { type: "paragraph"; text: string } | { type: "list"; items: string[] } | { type: "subheading"; text: string };
export type LegalSection = { title: string; blocks: LegalBlock[] };
export type LegalDocument = { title: string; introduction: string[]; sections: LegalSection[] };

// Neutral, original typesetting copy. These are not terms for a real company.
// Paragraph counts, lists, subheadings, and approximate copy lengths retain the
// observed document hierarchy without reproducing the company's legal text.
const sentences = [
  "This example describes how a topic could be presented within a general agreement, using neutral language for the purposes of this interface demonstration.",
  "The details shown here are illustrative and do not create an account, a commercial relationship, or an obligation between any visitor and a service provider.",
  "A real document would explain the relevant arrangements in clear terms and identify the people responsible for answering questions about their application.",
  "Readers should consider the context of each section and consult the appropriate information before making decisions about a product or an organization.",
  "Any names, contact details, locations, and references on this page are placeholders rather than statements about an existing business or its practices.",
  "The purpose of this text is to retain a readable document with consistent typography, paragraph spacing, and a useful navigation structure across screen sizes.",
  "No service is provided by this demonstration, and none of the examples should be treated as a promise, a recommendation, or professional advice.",
];
function sample(length: number, seed = 0, prefix = "") {
  let result = prefix;
  let index = seed;
  while (result.length < length - 155) {
    result += (result ? " " : "") + sentences[index % sentences.length];
    index++;
  }
  const endings = ["This is neutral sample content, not a binding agreement.", "The example is for display only.", "No real service is described."];
  while (result.length < length - 30) {
    const remaining = length - result.length;
    const next = endings.find(sentence => sentence.length <= remaining) ?? endings[2];
    result += (result ? " " : "") + next;
  }
  return result;
}
const paragraph = (length: number, seed = 0, prefix = ""): LegalBlock => ({ type: "paragraph", text: sample(length, seed, prefix) });
const list = (lengths: number[], seed = 0): LegalBlock => ({ type: "list", items: lengths.map((length, index) => sample(length, seed + index)) });
const subheading = (text: string): LegalBlock => ({ type: "subheading", text });

export const privacy: LegalDocument = {
  title: "Privacy Policy",
  introduction: [
    sample(440, 0, "Zen Trading is a neutral name used in an independent frontend reconstruction. This page is a visual placeholder, not a company's published privacy policy."),
    sample(320, 2, "This standalone preview has no application backend, advertising scripts, or analytics. Form information is not transmitted and remains in the current browser tab."),
  ],
  sections: [
    { title: "Information We Collect", blocks: [paragraph(90, 0), list([140, 160, 145, 155], 2), paragraph(125, 3), paragraph(82, 4)] },
    { title: "Use of Information", blocks: [list([45, 40, 85, 175, 38, 58], 1)] },
    { title: "Sharing of Information", blocks: [paragraph(62, 2), list([200, 160, 150], 2)] },
    { title: "Data Retention", blocks: [paragraph(310, 4)] },
    { title: "Security", blocks: [paragraph(330, 5)] },
    { title: "Your Rights", blocks: [paragraph(60), list([45, 40, 34, 42, 57], 1), paragraph(65, 2)] },
    { title: "Changes to This Policy", blocks: [paragraph(210, 3)] },
    { title: "Contact", blocks: [paragraph(85, 5, "Example contact details are provided for visual demonstration only.")] },
  ],
};

export const terms: LegalDocument = {
  title: "Terms of Service",
  introduction: [sample(215, 0, "These sample Terms of Service are non-binding placeholder text for a frontend reconstruction. Zen Trading is not a real service provider.")],
  sections: [
    { title: "Definitions", blocks: [paragraph(195, 0, '“Authorized User” is an illustrative label.'), paragraph(625, 1, '“Confidential Information” is a sample term.'), paragraph(205, 2, '“Customer Data” identifies an example category.'), paragraph(180, 3, '“Documentation” refers to illustrative written materials.'), paragraph(195, 4, '“Order” is used only as an example.'), paragraph(105, 5, '“Output” describes a sample result.'), paragraph(200, 6, '“Platform” is a neutral reference.'), paragraph(300, 0, '“Usage Data” is a placeholder category.')] },
    { title: "Access and Use", blocks: [subheading("License Grant"), paragraph(310, 1), subheading("Use Restrictions"), paragraph(65, 2), list([78, 90, 95, 82, 100, 88, 92, 84], 3)] },
    { title: "Ownership", blocks: [subheading("Zen Trading Intellectual Property"), paragraph(200, 4), subheading("Customer Data and Output"), paragraph(305, 5), subheading("Feedback"), paragraph(210, 6)] },
    { title: "Confidentiality", blocks: [paragraph(510, 0), paragraph(300, 1), paragraph(295, 2)] },
    { title: "Data Protection", blocks: [paragraph(310, 3), paragraph(315, 4), paragraph(195, 5)] },
    { title: "Fees and Payment", blocks: [paragraph(205, 6), paragraph(305, 0), paragraph(105, 1)] },
    { title: "Service Levels", blocks: [paragraph(310, 2)] },
    { title: "Term and Termination", blocks: [paragraph(305, 3), paragraph(205, 4), paragraph(300, 5)] },
    { title: "Warranties and Disclaimers", blocks: [paragraph(410, 6), paragraph(300, 0)] },
    { title: "Limitation of Liability", blocks: [paragraph(310, 1), paragraph(200, 2)] },
    { title: "Indemnification", blocks: [subheading("Zen Trading Indemnification"), paragraph(510, 3), subheading("Customer Indemnification"), paragraph(200, 4), subheading("Indemnification Procedures"), paragraph(305, 5)] },
    { title: "Force Majeure", blocks: [paragraph(300, 6)] },
    { title: "General Provisions", blocks: [paragraph(210, 0, "Governing Law."), paragraph(205, 1, "Dispute Resolution."), paragraph(205, 2, "Assignment."), paragraph(305, 3, "Entire Agreement."), paragraph(310, 4, "Amendments."), paragraph(205, 5, "Severability."), paragraph(105, 6, "Waiver."), paragraph(200, 0, "Notices.")] },
  ],
};
export function sectionId(title: string) { return title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/-$/, ""); }
