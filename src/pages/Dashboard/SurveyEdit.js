// EditSurvey.js
import React, { useState } from "react";
import LeftSidebar from "../../components/SurveyEdit/LeftSidebar";
import MainContent from "../../components/SurveyEdit/MainContent";
import RightSidebar from "../../components/SurveyEdit/RightSidebar";

const EditSurvey = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [sections, setSections] = useState([
    { id: "welcome", label: "Selamat datang", icon: "hugeicons:start-up-02" },
    { id: "thankYou", label: "Terima kasih!", icon: "icon-park-outline:bye" },
  ]);
  const [contentText, setContentText] = useState("Selamat datang");
  const [buttonText, setButtonText] = useState("Mulai");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [buttonColor, setButtonColor] = useState("#1F38DB");
  const [textColor, setTextColor] = useState("#000000");

  const [isEditing, setIsEditing] = useState(null);
  const [editedLabel, setEditedLabel] = useState("");

  const handleRename = (id, label) => {
    setIsEditing(id);
    setEditedLabel(label);
  };

  const handleRenameChange = (e) => {
    setEditedLabel(e.target.value);
  };

  const handleRenameSubmit = (id) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, label: editedLabel } : section
      )
    );
    setIsEditing(null);
  };

  const addItem = () => {
    const newItem = { id: `item-${sections.length + 1}`, label: `Item Baru ${sections.length + 1}`, icon: "mdi:file-document-outline" };
    setSections([...sections, newItem]);
    setActiveSection(newItem.id);
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 font-inter">
      <div className="min-h-20" />
      <div className="flex flex-grow">
        <LeftSidebar
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          addItem={addItem}
          handleRename={handleRename}
          isEditing={isEditing}
          editedLabel={editedLabel}
          handleRenameChange={handleRenameChange}
          handleRenameSubmit={handleRenameSubmit}
        />
        <MainContent
          contentText={contentText}
          textColor={textColor}
          buttonText={buttonText}
          buttonColor={buttonColor}
          bgColor={bgColor}
          backgroundImage={backgroundImage}
        />
        <RightSidebar
          contentText={contentText}
          setContentText={setContentText}
          buttonText={buttonText}
          setButtonText={setButtonText}
          bgColor={bgColor}
          setBgColor={setBgColor}
          buttonColor={buttonColor}
          setButtonColor={setButtonColor}
          textColor={textColor}
          setTextColor={setTextColor}
          backgroundImage={backgroundImage}
          handleBackgroundChange={handleBackgroundChange}
          activeSection={activeSection}
        />
      </div>
    </div>
  );
};

export default EditSurvey;
