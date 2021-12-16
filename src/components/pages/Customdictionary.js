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

var isArrayBufferSupported = new Buffer(new Uint8Array([1]).buffer)[0] === 1;

var arrayBufferToBuffer = isArrayBufferSupported
  ? arrayBufferToBufferAsArgument
  : arrayBufferToBufferCycle;

function arrayBufferToBufferAsArgument(ab) {
  return new Buffer(ab);
}

function arrayBufferToBufferCycle(ab) {
  var buffer = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

const sizeOf = require("image-size");

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
  const [loading, setLoading] = useState(false);
  //------------------------------------------------------------------------
  async function talkToMSP(data) {
    var verification_str = "";
    if ("serial" in navigator) {
      // The Web Serial API is supported.
      //Write
      const filters = [{ usbVendorId: 0x0451, usbProductId: 0xbef3 }];
      const port = await navigator.serial.requestPort({ filters });
      const { usbProductId, usbVendorId } = port.getInfo();
      await port.open({ baudRate: 9600 });
      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

      const writer = textEncoder.writable.getWriter();
      setLoading(true);
      await writer.write(data);

      //read echo
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      // Listen to data coming from the serial device.
      while (verification_str != "") {
        const { value, done } = await reader.read();
        if (done) {
          // Allow the serial port to be closed later.
          reader.releaseLock();
          break;
        }
        // value is a string.
        console.log(value);
        verification_str += value;
        if (verification_str != "") {
          writer.close();
          await writableStreamClosed;
          reader.cancel();
          console.log("data received from echo: " + verification_str);
          console.log("ACK Received");
          alert(
            "Successfully sent words and images to your SpellCheck device. Please disconnect the device."
          );
          break;
        }
      }
      //
      // while (verification_str != data) {
      //   const { value, done } = await reader.read();
      //   if (done) {
      //     // Allow the serial port to be closed later.
      //     reader.releaseLock();
      //     break;
      //   }
      //   // value is a string.
      //   //console.log(value);
      //   verification_str += value;
      //   if (verification_str === data) {
      //     writer.close();
      //     await writableStreamClosed;
      //     reader.cancel();
      //     console.log("data received from echo: " + verification_str);
      //     console.log("ACK Received");
      //     alert(
      //       "Successfully sent words and images to your SpellCheck device. Please disconnect the device."
      //     );
      //     break;
      //   }
      // }
      //
      //reader.cancel();
      await readableStreamClosed.catch(() => {
        /* Ignore the error */
      });
      // writer.close();
      // await writableStreamClosed;
      //port.close();

      await port.close();
      setLoading(false);
    } else {
      alert(
        "This feature is not supported in this browser. Please use Google Chrome."
      );
    }
  }
  //------------------------------------------------------------------------
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
          temp.push({
            word: inputFields[j].word,
            file: images[i].file,
            type: images[i].type,
            size: images[i].size,
            width: images[i].width,
            height: images[i].height,
            //file: JSON.stringify(images[i].file),
          });
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
      if (navigator.usb) {
        var data = "";
        for (var i = 0; i < result.length; i++) {
          var word;
          var image;
          var type;
          var size;
          var width;
          var height;
          if (i == result.length - 1) {
            word = result[i].word + "/";
            // image = result[i].file;
            //
            image = result[i].file + "$";
            type = result[i].type + "*";
            size = result[i].size + "#";
            width = result[i].width + "!";
            height = result[i].height;
            //
          } else {
            word = result[i].word + "/";
            //image = result[i].file + "|";
            //
            image = result[i].file + "$";
            type = result[i].type + "*";
            size = result[i].size + "#" + "+".repeat(10000);
            width = result[i].width + "!" + "+".repeat(10000);
            height = result[i].height + "%" + "+".repeat(10000) + "|";
            //
          }
          data += word;
          data += image;
          data += type;
          data += size + "+".repeat(10000);
          data += width + "+".repeat(10000);
          data += height;
        }
        //
        //alert(data.length + 1);
        console.log(data);
        //
        talkToMSP(
          "+".repeat(10000) +
            "|" +
            data +
            "%" +
            "+".repeat(10000) +
            ".".repeat(10000)
        );
        setResult([]);
      } else {
        alert("This feature is not supported.");
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

                    //--------PROTOTYPE BACKUP---------
                    // var file = event.target.files[0];
                    // alert(JSON.stringify(file.size));
                    // if (file.size < 8000) {
                    //   alert("setting image");
                    //   setImages([...images, { id: inputField.id, file: file }]);
                    // }
                    //----------------------------------

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
                          175,
                          175,
                          "JPEG",
                          5,
                          0,
                          (uri) => {
                            var fr = new FileReader();
                            fr.addEventListener("load", function () {
                              var u = new Uint8Array(this.result),
                                a = new Array(u.length),
                                i = u.length;

                              const dimensions = sizeOf(
                                arrayBufferToBuffer(this.result)
                              );
                              console.log(dimensions.width, dimensions.height);
                              var w = dimensions.width;
                              var h = dimensions.height;

                              while (i--)
                                // map to hex
                                a[i] =
                                  //"0x" +
                                  (u[i] < 16 ? "0" : "") + u[i].toString(16);
                              u = null; // free memory
                              // console.log(a); // work with this
                              //alert("array length: " + a.length);
                              setImages([
                                ...images,
                                // { id: inputField.id, file: a },
                                {
                                  id: inputField.id,
                                  file: a,
                                  type: "jpeg",
                                  size: a.length,
                                  width: w,
                                  height: h,
                                },
                              ]);
                            });
                            fr.readAsArrayBuffer(uri);
                            //-------------------
                            //alert("file size: " + JSON.stringify(uri.size));
                            //-------------------
                          },
                          "file",
                          175,
                          175
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
            {!loading && (
              <Button
                style={{ marginBottom: 20 }}
                role="button"
                onClick={handleSubmit}
              >
                Send Words
              </Button>
            )}
          </form>
          {loading && (
            <div
              style={{
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <img
                style={{ width: "40px", height: "40px" }}
                src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
              ></img>
            </div>
          )}
          <p style={{ color: "gray" }}>
            Connect a usb from a port on your computer to the device. Then click
            SEND WORDS
          </p>
          <img
            style={{ width: 100, height: 50, marginBottom: 10 }}
            src="https://c.tenor.com/iqcBlRBxaWEAAAAC/usb-flash-drive.gif"
          ></img>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default CustomDictionary;
