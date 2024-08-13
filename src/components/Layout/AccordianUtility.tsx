import { AccordionSummary, IconButton, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MoreVert } from "@mui/icons-material";

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  backgroundColor: "#3D3D3D",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export default function CustomAccordionSummary(title:) {
  return (
    <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
      <IconButton edge="end" aria-label="favorite">
        <MoreVert />
      </IconButton>
    </StyledAccordionSummary>
  );
}
