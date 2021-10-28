import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="description">
          <p>
            Welcome to SpellCheck. This web app provides services for loading
            new words and images onto the SpellCheck device and tehcnical
            support.
          </p>
        </div>
      </div>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="https://media.istockphoto.com/videos/loading-symbol-loop-video-id547356494?s=640x640"
              text="Load new words onto the device with our service here"
              label="Software to load new words"
              path="/services"
            />
            <CardItem
              src="https://t4.ftcdn.net/jpg/01/78/52/87/360_F_178528715_8m5PK4gcHYMrlRIxOGSSLxOAUOejrHgq.jpg"
              text="Get technical support assistance here"
              label="Technical Support"
              path="/technicalsupport"
            />
          </ul>
          {/* <ul className="cards__items">
            <CardItem
              src="images/img-3.jpg"
              text="Set Sail in the Atlantic Ocean visiting Uncharted Waters"
              label="Mystery"
              path="/services"
            />
            <CardItem
              src="images/img-4.jpg"
              text="Experience Football on Top of the Himilayan Mountains"
              label="Adventure"
              path="/products"
            />
            <CardItem
              src="images/img-8.jpg"
              text="Ride through the Sahara Desert on a guided camel tour"
              label="Adrenaline"
              path="/sign-up"
            />
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default Cards;
