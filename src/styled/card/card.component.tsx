import React from "react";

interface Props {
  /** A text to be displayed in the center of this component */
  title: string;
}

const Card = (props: Props) => {
  const { title } = props;
  return (
    <div>
      <p>{title}</p>
    </div>
  );
};

export { Card };
