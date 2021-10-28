import React from "react";
import "../../App.css";
import Footer from "../Footer";
import "../Cards.css";
import CardItem from "../CardItem";

export default function Services() {
  return (
    <div>
      <div className="cards">
        <div className="cards__container">
          <div className="description">
            <h1>Load Words & Images with USB</h1>
          </div>
        </div>
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              <CardItem
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9R-tjjVfe0Z8xg_bnvhCtl3_2K1Ksj1IqEQ&usqp=CAU"
                text="Upload new words and images here"
                label="New Words & Images"
                path="/customdictionary"
              />
              <CardItem
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi3G7wG5UnGnWSvRTIM59FQNQ7Cw_mQv3JGQ&usqp=CAU"
                text="Download default words and images here"
                label="Default Words & Images"
                path="/defaultdictionary"
              />
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
