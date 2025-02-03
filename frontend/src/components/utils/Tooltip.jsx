import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

// Portal Component: This helps render things outside the normal flow of the DOM.
// I use it here to make sure the tooltip doesn't get stuck inside any parent container with overflow hidden or weird z-index issues.
const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

// Tooltip Component: This is a reusable tooltip that shows up when you hover over something.
// Can customize the text, position (top, bottom, left, right), and how far it sits from the element.
const Tooltip = ({ children, text, position = "bottom", space = 8 }) => {
  // State to keep track of whether the tooltip is visible or not
  const [open, setOpen] = useState(false);

  // Refs to grab the actual DOM elements for the tooltip and the child element
  const tooltipRef = useRef();
  const elementRef = useRef();

  // When the mouse hovers over the child element, I show the tooltip and position it correctly
  const handleMouseEnter = () => {
    setOpen(true); // Make the tooltip visible
    const { x, y } = getPosition(elementRef.current, tooltipRef.current, position, space);
    tooltipRef.current.style.left = `${x}px`; // Set the horizontal position
    tooltipRef.current.style.top = `${y}px`; // Set the vertical position
  };

  // This function calculates where the tooltip should go based on the child element's position and size
  const getPosition = (element, tooltip, position, space) => {
    const rect = element.getBoundingClientRect(); // Get the child element's position and size
    const tooltipRect = tooltip.getBoundingClientRect(); // Get the tooltip's size
    let x = 0, y = 0;

    // Depending on the position prop, I calculate the tooltip's placement
    switch (position) {
      case "top":
        x = rect.left + (rect.width - tooltipRect.width) / 2; // Center it horizontally
        y = rect.top - tooltipRect.height - space; // Place it above the element
        break;
      case "bottom":
        x = rect.left + (rect.width - tooltipRect.width) / 2; // Center it horizontally
        y = rect.bottom + space; // Place it below the element
        break;
      case "left":
        x = rect.left - tooltipRect.width - space; // Place it to the left of the element
        y = rect.top + (rect.height - tooltipRect.height) / 2; // Center it vertically
        break;
      case "right":
        x = rect.right + space; // Place it to the right of the element
        y = rect.top + (rect.height - tooltipRect.height) / 2; // Center it vertically
        break;
      default:
        break;
    }

    return { x, y };
  };

  return (
    <>
      {/* I clone the child element and add the hover event handlers and ref to it */}
      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter, // Show tooltip on hover
        onMouseLeave: () => setOpen(false), // Hide tooltip when the mouse leaves
        ref: elementRef, // Attach the ref to the child element
      })}

      {/* Render the tooltip inside a Portal so it doesn't get trapped in the parent container */}
      <Portal>
        <div
          ref={tooltipRef}
          className={`fixed z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg transition-opacity ${
            open ? "opacity-100" : "opacity-0" // Fade in and out smoothly
          }`}
        >
          {text} {/* The tooltip text */}
        </div>
      </Portal>
    </>
  );
};

export default Tooltip;