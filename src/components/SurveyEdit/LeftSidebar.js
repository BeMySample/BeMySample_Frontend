// LeftSidebar.js
import React from "react";
import { Icon } from "@iconify/react";

const LeftSidebar = ({
  sections,
  activeSection,
  setActiveSection,
  addItem,
  handleRename,
  isEditing,
  editedLabel,
  handleRenameChange,
  handleRenameSubmit,
}) => {
  return (
    <aside className="w-1/5 bg-[#F5F5F5] p-4 overflow-y-auto max-h-[90vh]">
      <ul className="space-y-4">
        {sections.map((section) => (
          <li
            key={section.id}
            className={`p-3 rounded-lg shadow-sm cursor-pointer flex items-center ${
              activeSection === section.id
                ? "bg-[#E6E6E6] font-semibold"
                : "bg-white"
            }`}
            onClick={() => setActiveSection(section.id)}
            onDoubleClick={() => handleRename(section.id, section.label)}
          >
            <Icon icon={section.icon} className="mr-2 text-lg text-[#24B1DB]" />
            {isEditing === section.id ? (
              <input
                type="text"
                value={editedLabel}
                onChange={handleRenameChange}
                onBlur={() => handleRenameSubmit(section.id)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleRenameSubmit(section.id)
                }
                autoFocus
                className={`outline-none ${
                  activeSection === section.id ? "bg-[#E6E6E6]" : "bg-white"
                }`}
              />
            ) : (
              section.label
            )}
          </li>
        ))}

        <li
          onClick={addItem}
          className="mt-4 p-2 flex items-center justify-start text-[#757575] cursor-pointer hover:text-[#24B1DB] border-2 border-zinc-300 hover:border-[#24B1DB] rounded-lg"
        >
          <Icon icon="mdi:plus" className="mr-1" />
          Tambahkan Item
        </li>
      </ul>
    </aside>
  );
};

export default LeftSidebar;
