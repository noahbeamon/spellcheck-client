import React, { useState } from "react";
import Footer from "../Footer";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";

import Resizer from "react-image-file-resizer";

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

const notAllowed = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "$",
  "+",
  "-",
  "&",
  "|",
  " ",
  "!",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  "^",
  "~",
  "*",
  "?",
  ":",
  "/",
  ",",
  "@",
  "_",
  "=",
  "#",
  ";",
  '"',
  "'",
  "\\",
  ">",
  "<",
  ".",
  "`",
  "%",
];

function CustomDictionary() {
  const classes = useStyles();
  var [images, setImages] = useState([]);
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), word: "", file: null },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    setInputFields([...inputFields, { id: uuidv4(), word: "", file: null }]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);

    const vals = [...images];
    vals.splice(
      vals.findIndex((value) => value.id === id),
      1
    );
    setImages(vals);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Container>
        <h1 style={{ color: "#7d8782" }}>
          Add custom words and images with USB <i class="fab fa-usb"></i>
        </h1>
        <form className={classes.root} onSubmit={handleSubmit}>
          {inputFields.map((inputField) => (
            <div key={inputField.id}>
              <TextField
                name="word"
                label="word"
                variant="filled"
                inputProps={{ maxLength: 5 }}
                onKeyPress={(e) => {
                  // if (e.key === " " || e.key === "-" || ) {
                  //   e.preventDefault();
                  // }
                  if (notAllowed.includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                value={inputField.word}
                onChange={(event) => {
                  handleChangeInput(inputField.id, event);
                }}
              />
              <input
                name="file"
                type="file"
                accept="image/png, image/jpeg"
                value={inputField.file}
                onChange={(event) => {
                  handleChangeInput(inputField.id, event);

                  var file = event.target.files[0];

                  var fileInput = false;
                  if (event.target.files[0]) {
                    fileInput = true;
                  }
                  //for removing image on same index
                  var found = false;
                  for (var i = 0; i < images.length; i++) {
                    if (images[i].id == inputField.id) {
                      images.splice(i, 1);
                      found = true;
                      break;
                    }
                  }
                  //
                  if (fileInput) {
                    try {
                      Resizer.imageFileResizer(
                        event.target.files[0],
                        320,
                        240,
                        "JPEG",
                        100,
                        0,
                        (uri) => {
                          setImages([
                            ...images,
                            { id: inputField.id, file: uri },
                          ]);
                        },
                        "base64"
                      );
                    } catch (err) {
                      console.log(err);
                    }
                  }
                  // setImages([
                  //   ...images,
                  //   { id: inputField.id, file: binary_of_image },
                  // ]);

                  // var reader = new FileReader();

                  // reader.onload = function (e) {
                  //   // The file's text will be printed here
                  //   //alert(e.target.result);
                  //   var the_file = resizeImage(e.target.result, 320, 240);
                  //   setImages([
                  //     ...images,
                  //     { id: inputField.id, file: the_file },
                  //   ]);
                  //   //alert(JSON.stringify(images));
                  // };

                  // reader.onload = function (e) {
                  //   // The file's text will be printed here
                  //   //alert(e.target.result);
                  //   setImages([
                  //     ...images,
                  //     { id: inputField.id, file: e.target.result },
                  //   ]);
                  //   //alert(JSON.stringify(images));
                  // };
                  //reader.readAsBinaryString(file);
                }}
              />
              <IconButton
                disabled={inputFields.length === 1}
                onClick={() => handleRemoveFields(inputField.id)}
              >
                <i class="fa fa-minus"></i>
              </IconButton>
              <IconButton onClick={handleAddFields}>
                <i class="fa fa-plus"></i>
              </IconButton>
            </div>
          ))}
          <Button
            style={{ marginBottom: 20 }}
            role="button"
            onClick={handleSubmit}
          >
            Send Words
          </Button>
        </form>
        <p>Images Added: {images.length}</p>
        <p>Image Array: {JSON.stringify(images)}</p>
        <p>Word Array: {JSON.stringify(inputFields)}</p>
      </Container>
      <Footer />
    </div>
  );
}

export default CustomDictionary;
