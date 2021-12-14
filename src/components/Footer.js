// import React from "react";
// import "./Footer.css";
// import { Button } from "./Button";
// import { Link } from "react-router-dom";

// function Footer() {
//   const d = new Date();
//   var thisYear = d.getFullYear();
//   return (
//     <div className="footer-container">
//       {/* <section className="footer-subscription">
//         <p className="footer-subscription-heading">
//           Join our newsletter to stay updated
//         </p>
//         <p className="footer-subscription-text">
//           You can unsubscribe at any time.
//         </p>
//         <div className="input-areas">
//           <form>
//             <input
//               className="footer-input"
//               name="email"
//               type="email"
//               placeholder="Your Email"
//             />
//             <Button buttonStyle="btn--outline">Subscribe</Button>
//           </form>
//         </div>
//       </section> */}
//       <div class="footer-links">
//         <div className="footer-link-wrapper">
//           <div class="footer-link-items">
//             <h2>About Us</h2>
//             <Link to="/">Services</Link>
//             <Link to="/">Technical Support</Link>
//             <Link to="/">Terms of Service</Link>
//           </div>
//           <div class="footer-link-items">
//             <h2>Contact Us</h2>
//             <Link to="/">Customer Support</Link>
//           </div>
//         </div>
//         <div className="footer-link-wrapper">
//           <div class="footer-link-items">
//             <h2>Social Media</h2>
//             <Link to="/">
//               Instagram <i class="fab fa-instagram" />
//             </Link>

//             <Link to="/">
//               Twitter <i class="fab fa-twitter" />
//             </Link>
//             <Link to="/">
//               LinkedIn <i class="fab fa-linkedin" />
//             </Link>
//           </div>
//         </div>
//       </div>
//       <section class="social-media">
//         <div class="social-media-wrap">
//           <div class="footer-logo">
//             <Link to="/" className="social-logo">
//               SpellCheck
//               <i class="fab fa-typo3" />
//             </Link>
//           </div>
//           <small class="website-rights">&copy; {thisYear} SpellCheck</small>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Footer;

import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

function Footer() {
  const d = new Date();
  var thisYear = d.getFullYear();
  return (
    <div className="footer-container">
      {/* <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join our newsletter to stay updated
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section> */}
      <div class="footer-links">
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>About Us</h2>
            <Link to="/">Services</Link>
            <Link to="/">Technical Support</Link>
            <Link to="/">Terms of Service</Link>
          </div>
          <div class="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/">Customer Support</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>Social Media</h2>
            <a href="https://www.instagram.com/spellcheck_uva/" target="_blank">
              Instagram <i class="fab fa-instagram" />
            </a>

            <Link to="/">
              Twitter <i class="fab fa-twitter" />
            </Link>
            <Link to="/">
              LinkedIn <i class="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </div>
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              SpellCheck
              <i class="fab fa-typo3" />
            </Link>
          </div>
          <small class="website-rights">&copy; {thisYear} SpellCheck</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
