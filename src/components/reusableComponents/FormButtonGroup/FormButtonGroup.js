import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import { DEF_ACTIONS } from "../../../utils/constants/actions";
import { Add, Edit } from "@mui/icons-material";
import BackButton from "../BackButton/BackButton";

export default function FormButtonGroup({ action, handleBack, handleSubmit }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <ButtonGroup>
        <BackButton goBack={handleBack}/>
        {action === DEF_ACTIONS.ADD && (
          <Button color="success" variant="contained" onClick={handleSubmit}>
            <Add />
            ADD
          </Button>
        )}
        {action === DEF_ACTIONS.EDIT && (
          <Button variant="contained" color="success" onClick={handleSubmit}>
            <Edit />
            EDIT
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );
}
