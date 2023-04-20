
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler()}   // Fix: Wrapped onClickHandler in an arrow function
      >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(false);  // Fix: Swapped selectedIndex and setSelectedIndex

  useEffect(() => {
    setSelectedIndex(false); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const handleClick = () => {
    setSelectedIndex(selectedIndex => !selectedIndex); //  When clicked toggle between true and false
  };

  console.log(selectedIndex);

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index} // Fix: Add the key prop with a unique value
          onClickHandler={() => handleClick()}  // Fix: removed the index passed in the function
          text={item.text}
          index={index}
          isSelected={selectedIndex}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: [{text:'item 1'}, {text:'item 2'}, {text:'item 3' }, {text:'item 4'}, {text:'item 5' }],  // Fix: Added data to the items array
};

const List = memo(WrappedListComponent);

export default List;

