// SortableHeader.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const SortableHeader = ({
  onSort,
  sortConfig,
  columnKey,
  children,
  className,
}) => {
  const renderSortIcon = () => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "ascending" ? faCaretUp : faCaretDown;
    }
    return faCaretDown; // Always show a default icon
  };

  const handleSort = () => {
    let direction = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    onSort(columnKey, direction);
  };

  return (
    <div onClick={handleSort} className={className}>
      {children}
      <FontAwesomeIcon
        icon={renderSortIcon()}
        className="ml-2" // Add some left margin to the icon
      />
    </div>
  );
};

export default SortableHeader;
