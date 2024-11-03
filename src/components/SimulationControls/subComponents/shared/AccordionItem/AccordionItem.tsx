import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";

export interface AccordionItemProps {
  summary: string;
  children: React.ReactNode;
}

export const AccordionItem = ({ summary, children }: AccordionItemProps) => {
  const key = useMemo(() => uuidv4(), []);

  return (
    <Accordion key={key}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {summary}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
