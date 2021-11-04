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

//------------------------------------------------------------------------
async function talkToMSP(data) {
  try {
    let device = await navigator.usb.requestDevice({
      filters: [{ vendorId: 0x0451 }],
    });
    await device.open(); // Begin a session.
    await device.selectConfiguration(1); // Select configuration #1 for the device.
    await device.claimInterface(2); // Request exclusive control over interface #2.
    device.transferOut(2, data);
    alert("Successfully sent words and images to your SpellCheck device.");
    console.log(data);
  } catch (error) {
    alert(error);
  }
}
//------------------------------------------------------------------------

function CustomDictionary() {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), word: "", file: null },
  ]);
  var [result, setResult] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //mergeStructures();
    //alert(JSON.stringify(inputFields));

    for (var i = 0; i < inputFields.length; i++) {
      var found = false;
      for (var j = 0; j < images.length; j++) {
        if (inputFields[i].id == images[j].id) {
          found = true;
        }
      }
      if (found == false) {
        alert(
          "You did not enter an image for every word. Please review the list and try again."
        );
        setResult([]);
        return;
      }
    }

    var temp = result;
    for (var i = 0; i < images.length; i++) {
      for (var j = 0; j < inputFields.length; j++) {
        if (images[i].id == inputFields[j].id) {
          temp.push({ word: inputFields[j].word, file: images[i].file });
        }
      }
    }
    setResult(temp);

    var fieldEmpty = false;
    for (var i = 0; i < result.length; i++) {
      //var fieldEmpty = false;
      if (result[i].word == "") {
        fieldEmpty = true;
      }
    }
    if (fieldEmpty) {
      alert("A field is empty. Please enter a word and try again.");
      setResult([]);
      return;
    }

    if (result != null) {
      //alert("Sending words & images to SpellCheck...");
      //alert(JSON.stringify(result));
      //alert(JSON.stringify(navigator.usb));
      if (navigator.usb) {
        var the_data = "";
        for (var i = 0; i < result.length; i++) {
          //var word = str2ab(result[i].word);
          //var encoder = new TextEncoder(); // always utf-8
          //var word = encoder.encode(result[i].word);
          //talkToMSP(word);
          //var image = Buffer.from(result[i].file, "base64");
          //talkToMSP(image);
          var word;
          var image;
          if (i == result.length - 1) {
            word = result[i].word + ",";
            image = result[i].file;
          } else {
            word = result[i].word + ",";
            image = result[i].file + ",";
          }
          the_data += word;
          the_data += image;
        }
        console.log(the_data);
        var encoder = new TextEncoder();
        var data_tosend = encoder.encode(the_data);
        talkToMSP(data_tosend);
        setResult([]);
      } else {
        alert("WebUSB not supported.");
        setResult([]);
      }
    }
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
  };

  return (
    <div>
      <div style={{ marginTop: 20, minHeight: "100vh" }}>
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
                        alert(err);
                      }
                    }
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
          <p style={{ color: "gray" }}>
            Connect a usb from a port on your computer to the device. Then click
            SEND WORDS
          </p>
          <img
            style={{ width: 100, height: 50 }}
            src="https://c.tenor.com/iqcBlRBxaWEAAAAC/usb-flash-drive.gif"
          ></img>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default CustomDictionary;
