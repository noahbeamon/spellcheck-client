// import React from "react";
// import "../../App.css";
// import Footer from "../Footer";

// export default function TechnicalSupport() {
//   return (
//     <div>
//       <h1>User Manual</h1>
//       <p>product instructions</p>
//       <Footer />
//     </div>
//   );
// }

import React from "react";
import "../../App.css";
import Footer from "../Footer";

export default function TechnicalSupport() {
  return (
    <>
      <div id="techsup-wrapper">
        <h1>Technical support</h1>
        <br />
        <p>In case if you face errors, try one of the steps below.</p>
        <ol>
          <li>
            If your file was not uploaded, try a different file with less size.
          </li>
          <li>
            If your file was not uploaded, try a different COM port version
            until you find a working one.
          </li>
        </ol>
      </div>
      <Footer />
    </>
  );
}
