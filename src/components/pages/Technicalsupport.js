import React, { useEffect, useState } from "react";
import "../../App.css";
import Footer from "../Footer";
import Faq from "react-faq-component";
import Pdf from "./SpellCheck User Guide_BananaSeals.pdf";

const data = {
  title: "Tech Support",
  rows: [
    {
      title: "Words and images not loading properly?",
      content: (
        <div>
          <img src="https://i.imgur.com/DF7h3g6.png" width="300" height="300" />
          <br />
          Try selecting another COM port on the pop-up after selecting SEND
          WORDS.
        </div>
      ),
    },
    {
      title: "Need to check the hardare configuration on your device?",
      content: (
        <div>
          <img src="https://i.imgur.com/45HSu3C.png" width="400" height="300" />
          <br />
          The COM port you should select for loading words onto your device is
          XDS110/Class Application UART (COM #)
        </div>
      ),
    },
    {
      title: "LCD touchscreen not calibrating?",
      content: (
        <div>
          <img src="https://i.imgur.com/qdcR3g7.png" width="400" height="300" />
          <br />
          Unplug and replug the barrel jack. The LCD will display a callibration
          screen prompting you to tap on each dot. Please tap on each dot in
          their respective locations to callibrate the touchscreen.
        </div>
      ),
    },
    {
      title: "Device not recognizing letter block?",
      content: `If the device is not recognizing an inidivdiual latter block, please make sure the block is placed in the correct orientation within its slot. Contact customer service for further assistance.`,
    },
    {
      title: "Barrel jack not working?",
      content: (
        <p>
          Unplug and replug the barrel jack. Please contact cutomer service for
          further assitance.
        </p>
      ),
    },
  ],
};

const styles = {
  // bgColor: 'white',
  titleTextColor: "gray",
  rowTitleColor: "black",
  rowContentColor: "grey",
  arrowColor: "#afa640",
};

const config = {
  // animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};

export default function TechnicalSupport() {
  return (
    <div>
      <div style={{ margin: 20 }}>
        <Faq data={data} styles={styles} config={config} />
        <h3 style={{ color: "gray" }}>User Manual</h3>
        <a href={Pdf} target="_blank">
          Download User Manual
        </a>
      </div>
      <Footer />
    </div>
  );
}
