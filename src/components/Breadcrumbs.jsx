import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const Breadcrumbs = ({ items, separator }) => {
  const [editableLabel, setEditableLabel] = useState(
    items[items.length - 1].label
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditableLabel(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center space-x-2 text-gray-600 font-inter text-base"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index === items.length - 1 ? (
            isEditing ? (
              <input
                type="text"
                value={editableLabel}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsEditing(false)}
                className="border-b border-blue-600 outline-none focus:border-blue-600 text-gray-800 font-semibold"
                autoFocus
              />
            ) : (
              <div className="flex items-center space-x-1">
                <span
                  onClick={handleEditClick}
                  className="text-gray-800 font-semibold hover:underline cursor-pointer text-base"
                >
                  {editableLabel}
                </span>
                <Icon
                  icon="line-md:edit"
                  onClick={handleEditClick}
                  className="text-gray-500 hover:text-blue-600 cursor-pointer text-xl"
                />
              </div>
            )
          ) : (
            <a href={item.link || "#"} className="hover:text-blue-600">
              {item.label}
            </a>
          )}

          {index < items.length - 1 && (
            <span className="mx-2">
              {typeof separator === "string" ? (
                <Icon icon={separator} />
              ) : (
                separator
              )}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ).isRequired,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Breadcrumbs.defaultProps = {
  separator: "material-symbols:arrow-forward-ios-rounded",
};

export default Breadcrumbs;
