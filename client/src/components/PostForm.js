// src/components/PostForm.js
import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

const PostForm = ({ open, handleClose }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    registrationNumber: "",
    languagesKnown: [],
    branch: "",
    yearOfStudy: "",
    cgpa: "",
    contactDetails: "",
  });
  const [language, setLanguage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLanguage = () => {
    if (language && !formData.languagesKnown.includes(language)) {
      setFormData({
        ...formData,
        languagesKnown: [...formData.languagesKnown, language],
      });
      setLanguage("");
    }
  };

  const handleDeleteLanguage = (langToDelete) => {
    setFormData({
      ...formData,
      languagesKnown: formData.languagesKnown.filter(
        (lang) => lang !== langToDelete
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your submission logic here
      await axios.post("/api/posts", formData);
      // Handle success
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create a Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="registrationNumber"
          label="Registration Number"
          type="text"
          fullWidth
          value={formData.registrationNumber}
          onChange={handleChange}
        />

        <div className={classes.chips}>
          {formData.languagesKnown.map((lang) => (
            <Chip
              key={lang}
              label={lang}
              onDelete={() => handleDeleteLanguage(lang)}
              className={classes.chip}
            />
          ))}
        </div>

        <TextField
          margin="dense"
          label="Add Language"
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddLanguage()}
        />
        <Button onClick={handleAddLanguage}>Add</Button>

        <FormControl className={classes.formControl}>
          <InputLabel>Branch</InputLabel>
          <Select name="branch" value={formData.branch} onChange={handleChange}>
            <MenuItem value="CSE">CSE</MenuItem>
            <MenuItem value="ECE">ECE</MenuItem>
            <MenuItem value="Mechanical">Mechanical</MenuItem>
            <MenuItem value="Civil">Civil</MenuItem>
            {/* Add more branches as needed */}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Year of Study</InputLabel>
          <Select
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
          >
            <MenuItem value={1}>1st Year</MenuItem>
            <MenuItem value={2}>2nd Year</MenuItem>
            <MenuItem value={3}>3rd Year</MenuItem>
            <MenuItem value={4}>4th Year</MenuItem>
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          name="cgpa"
          label="CGPA"
          type="number"
          fullWidth
          value={formData.cgpa}
          onChange={handleChange}
        />

        <TextField
          margin="dense"
          name="contactDetails"
          label="WhatsApp Number (with country code)"
          type="text"
          fullWidth
          value={formData.contactDetails}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onSubmit={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;
