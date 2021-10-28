import React, { useState } from "react";
import Footer from "../Footer";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
//import RemoveIcon from "@material-ui/icons/Remove";
//import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function CustomDictionary() {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    // { id: uuidv4(), firstName: "", lastName: "" },
    { id: uuidv4(), word: "", file: null },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
    alert(JSON.stringify(inputFields));
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      //   { id: uuidv4(), firstName: "", lastName: "" },
      { id: uuidv4(), word: "", file: null },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <div>
      <Container>
        <h1>Add New Words and Images</h1>
        <form className={classes.root} onSubmit={handleSubmit}>
          {inputFields.map((inputField) => (
            <div key={inputField.id}>
              <TextField
                name="word"
                label="word"
                variant="filled"
                length="5"
                value={inputField.word}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                value={inputField.file}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />
              <IconButton
                disabled={inputFields.length === 1}
                onClick={() => handleRemoveFields(inputField.id)}
              >
                {/* <RemoveIcon /> */}
                <i class="fa fa-minus"></i>
              </IconButton>
              <IconButton onClick={handleAddFields}>
                {/* <AddIcon /> */}
                <i class="fa fa-plus"></i>
              </IconButton>
            </div>
          ))}
          <Button role="button" onClick={handleSubmit}>
            Send Words
          </Button>
        </form>
      </Container>
      <Footer />
    </div>
  );
}

export default CustomDictionary;
