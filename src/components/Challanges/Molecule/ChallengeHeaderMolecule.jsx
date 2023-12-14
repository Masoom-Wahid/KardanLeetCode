import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/material/styles";

const HeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Use primary color for headers
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark, // Darken on hover
  },
  "& .MuiTooltip-tooltip": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
  },
}));

const ChallengeHeaderMolecule = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <HeaderCell>No.</HeaderCell>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>
            <Typography variant="inherit" noWrap>
              Max Score
              <Tooltip title="Maximum score for this challenge">
                <InfoIcon
                  sx={{
                    fontSize: "1rem",
                    marginLeft: "5px",
                    verticalAlign: "middle",
                  }}
                />
              </Tooltip>
            </Typography>
          </HeaderCell>
          <HeaderCell>
            <Typography variant="inherit" noWrap>
              Binary
              <Tooltip title="Binary scoring">
                <InfoIcon
                  sx={{
                    fontSize: "1rem",
                    marginLeft: "5px",
                    verticalAlign: "middle",
                  }}
                />
              </Tooltip>
            </Typography>
          </HeaderCell>
          <HeaderCell>
            <Typography variant="inherit" noWrap>
              Editorial
              <Tooltip title="Link to editorial">
                <InfoIcon
                  sx={{
                    fontSize: "1rem",
                    marginLeft: "5px",
                    verticalAlign: "middle",
                  }}
                />
              </Tooltip>
            </Typography>
          </HeaderCell>
          <HeaderCell>Action</HeaderCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default ChallengeHeaderMolecule;
