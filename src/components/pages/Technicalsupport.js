import React, { useEffect, useState } from "react";
import "../../App.css";
import Footer from "../Footer";
import Faq from "react-faq-component";

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
    // <>
    //   <div id="techsup-wrapper">
    //     <h1>Technical support</h1>
    //     <br />
    //     <p>In case if you face errors, try one of the steps below.</p>
    //     <ol>
    //       <li>
    //         If your file was not uploaded, try a different file with less size.
    //       </li>
    //       <li>
    //         If your file was not uploaded, try a different COM port version
    //         until you find a working one.
    //       </li>
    //     </ol>
    //   </div>
    //   <Footer />
    // </>
    //<>

    // <div className="techsup-wrapper">
    //   <img
    //     src="https://i.imgur.com/DF7h3g6.png"
    //     style={{ width: 300, height: 300 }}
    //   />
    //   <Footer />
    // </div>

    //</>
    <div>
      <div style={{ margin: 20 }}>
        <Faq data={data} styles={styles} config={config} />
      </div>
      <Footer />
    </div>
  );
}
