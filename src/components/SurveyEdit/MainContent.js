// MainContent.js
import React from "react";
import WelcomeContent from "./Templates/WelcomeContent";
import ShortText from "./Templates/ShortText";
import Time from "./Templates/Time";
import Dropdown from "./Templates/Dropdown";
import MultipleChoice from "./Templates/MultipleChoice";
import Quote from "./Templates/Quote";
import LongText from "./Templates/LongText";
import LikertScale from "./Templates/LikertScale";

const MainContent = ({
  contentText,
  textColor,
  buttonColor,
  buttonText,
  bgColor,
  backgroundImage,
}) => {
  const renderSectionContent = () => {
    switch (contentText) {
      case "Selamat datang":
        return (
          <WelcomeContent
            textColor={textColor}
            buttonColor={buttonColor}
            buttonText={buttonText}
          />
        );
      case "Teks Pendek":
        return <ShortText />;
      case "Waktu":
        return <Time />;
      case "Dropdown":
        return <Dropdown />;
      case "Pilihan Ganda":
        return <MultipleChoice />;
      case "Quote":
        return <Quote />;
      case "Teks Panjang":
        return <LongText />;
      case "Likert":
        return <LikertScale />;
      default:
        return <p>Konten Default</p>;
    }
  };

  return (
    <main
      className="flex-grow p-8 flex justify-center items-center shadow-md m-4 rounded-2xl"
      style={{
        backgroundColor: bgColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
      }}
    >
      {renderSectionContent()}
    </main>
  );
};

export default MainContent;
