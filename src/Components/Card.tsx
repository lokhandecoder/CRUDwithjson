import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { CardUtlitiies } from "../Utilities/CardUtlitiies";
import { calculateAge, genderOptions } from "../Model/Function";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Card ({ searchTerm }: { searchTerm: string }) {
    const CardUtility = CardUtlitiies(searchTerm);
    const { filteredCelebrity,
        editMode,
        fieldValues,
        handleFieldChange,
        errors,
        handleCancel,
        handleSave,
        handleEdit,
        setDeleteConfirmationOpen,
        setItemToDeleteIndex,
        deleteConfirmationOpen,
        handleDeleteConfirmationClose,
        itemToDeleteIndex,
        handleDelete,} = CardUtility;
 
  return (
    <div>
      {filteredCelebrity.map((character, index) => (
        <Accordion key={character.id} style={{ marginBottom: '16px', backgroundColor: "#c6ffdd" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${character.id}-content`}
            id={`panel${character.id}-header`}
          >
            <img
              className="w-12 h-12 inline rounded-full"
              src={character.picture}
              alt={`${character.first} ${character.last}`}
            ></img>
            <div className="ml-4 p-2">{`${character.first} ${character.last}`}</div>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <span>{editMode ? "Date of Birth" : "Age"}</span>
                {editMode ? (
                  <input
                    type="date"
                    value={fieldValues[index]?.dob || ""}
                    onChange={(e) =>
                      handleFieldChange(index, "dob", e.target.value)
                    }
                    className={`border rounded p-3 w-full mt-1 focus:border-blue-500`}
                    style={{ backgroundColor: "#c6ffdd"}}
                  />
                ) : (
                  <Item sx={{ p: 2, border: "1px solid #000",backgroundColor: "#c6ffdd" }}>
                    {calculateAge(character.dob)} years
                  </Item>
                )}
              </Grid>
              <Grid item xs={4}>
                <span style={{ textAlign: "left" }}>Gender</span>
                <TextField
                  select
                  fullWidth
                  sx={{ mt: 0 }}
                  value={fieldValues[index]?.gender || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "gender", e.target.value)
                  }
                  disabled={!editMode}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4} style={{ border: "none" }}>
                <span>Country</span>
                <OutlinedInput
                  name="country"
                  fullWidth
                  value={fieldValues[index]?.country || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "country", e.target.value)
                  }
                  disabled={!editMode}
                  error={Boolean(errors[index]?.country)}
                  inputProps={{
                    pattern: "[A-Za-z ]*", 
                    title: "Only letters and spaces are allowed",
                  }}
                />
                {errors[index]?.country && (
                  <div style={{ color: "red" }}>{errors[index]?.country}</div>
                )}
              </Grid>
            </Grid>
            <h4 style={{ textAlign: "left" }}>Description</h4>
            <OutlinedInput
              sx={{ mt: 1 }}
              id="description"
              name="description"
              multiline
              rows={4}
              fullWidth
              value={fieldValues[index]?.description || ""}
              onChange={(e) =>
                handleFieldChange(index, "description", e.target.value)
              }
              disabled={!editMode}
              error={Boolean(errors[index]?.description)}
            />
            {errors[index]?.description && (
              <div style={{ color: "red" }}>{errors[index]?.description}</div>
            )}
          </AccordionDetails>
          <AccordionActions>
            {editMode === index && (
              <>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleCancel(index)}
                >
                <CancelIcon />
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleSave(index)}
                >
                 <CheckCircleIcon />
                </Button>
              </>
            )}
            {editMode !== index && (
              <>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleEdit(index)}
                >
                  <EditIcon />
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    setDeleteConfirmationOpen(true);
                    setItemToDeleteIndex(index);
                  }}
                >
                  <DeleteIcon />
                </Button>
              </>
            )}
          </AccordionActions>
        </Accordion>
      ))}
      <DeleteConfirmationDialog
        isOpen={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
        onDelete={() => {
          if (itemToDeleteIndex !== null) {
            handleDelete(itemToDeleteIndex);
          }
        }}
      />

    </div>
  );
}

export default Card;
