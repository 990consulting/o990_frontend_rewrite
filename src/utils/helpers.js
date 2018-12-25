import {
  resources
} from 'routes/internal';

export const renderSearchAsYourTypeBox = (path) => {
  return !path.includes(resources);
};

export const toggleArrayValue = (value, array) => {
  const newArray = [...array];
  const index = array.indexOf(value);

  if (index > -1) {
    newArray.splice(index, 1)
  } else {
    newArray.push(value);
  }
  return newArray;
};

export const scrollTo = (props) => {
  if (props.location.hash) {
    const id = props.location.hash.slice(1);
    const domElement = document.getElementById(id);
    if (domElement) {
      domElement.scrollIntoView();
    }
  } else {
    window.scrollTo(0, 0);
  }
};