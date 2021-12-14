// // import React from "react";
// // import "../../App.css";
// // import Footer from "../Footer";

// // export default function AboutUs() {
// //   return (
// //     <div>
// //       <h1>About Us</h1>
// //       <p>Info about the product and mission</p>
// //       <Footer />
// //     </div>
// //   );
// // }

// import React from "react";
// import "../../App.css";
// import Footer from "../Footer";

// export default function AboutUs() {
//   return (
//     <>
//       <div id="aboutus-wrapper">
//         <h1>About Us</h1>
//         <br />
//         <p>
//           SpellCheck is an educational tool designed to help children ages 5-7
//           learn how to spell English words. The objective is to display an image
//           on an LCD screen and initiate the user to spell out the object on the
//           screen. Authors are University of Virginia students: Noah Beamon,
//           Justin Guo, Rachel Lew, Catlinh Nguyen, Shymbolat Tnaliyev
//         </p>
//       </div>
//       <Footer />
//     </>
//   );
// }

import React from "react";
import "../../App.css";
import Footer from "../Footer";

export default function AboutUs() {
  return (
    <>
      <div id="aboutus-wrapper">
        <h1>About Us</h1>
        <br />
        <img src="/images/photo_2021-12-07_14-43-23.jpg" />
        <br />
        <br />
        <p className="desc">
          SpellCheck is an educational tool designed to help children ages 5-7
          learn how to spell English words. The objective is to display an image
          on an LCD screen and initiate the user to spell out the object on the
          screen. Authors are University of Virginia students:{" "}
          <span>Noah Beamon</span>, <span>Justin Guo</span>,{" "}
          <span>Rachel Lew</span>, <span>Catlinh Nguyen</span>,{" "}
          <span>Shymbolat Tnaliyev</span>
        </p>
      </div>
      <Footer />
    </>
  );
}
