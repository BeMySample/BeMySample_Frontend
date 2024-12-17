import React from 'react';
import ContentOptions from './ContentOptions'; // New component for content-related props
import DesignOptions from './DesignOptions'; // New component for design-related props

const RightSidebar = ({
  contentProps,
  designProps,
}) => {
  return (
    <aside className="w-1/5 max-w-[400px] bg-neutral-100 p-4">
      <div className="space-y-6 font-inter text-sm text-gray-700">
        {/* Content Section */}
        <ContentOptions {...contentProps} />

        {/* Design Section */}
        <DesignOptions {...designProps} />
      </div>
    </aside>
  );
};

export default RightSidebar;