import type { PortfolioCaseLabels } from "@/components/PortfolioCaseModal";

export function getPortfolioCaseLabels(
  labels: Record<string, string>
): PortfolioCaseLabels {
  return {
    client: labels.caseClient ?? "Client",
    challenge: labels.caseChallenge ?? "Challenge",
    approach: labels.caseApproach ?? "Approach",
    deliverables: labels.caseDeliverables ?? "Deliverables",
    result: labels.caseResult ?? "Result",
    close: labels.close ?? "Close",
    viewInstagram: labels.viewInstagram ?? "Instagram",
  };
}
