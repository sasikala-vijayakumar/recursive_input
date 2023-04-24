import React, { useState, useEffect } from "react";
import "./recursive_input.css";

interface Props {
  parentCount: number;
  //   onDelete: (childCount: number) => void;
}
export default function RecursiveInput(props: Props) {
  const { parentCount } = props;
  const [value, setValue] = useState("");
  const [children, setChildren] = useState<JSX.Element[]>([]);

  const addChild = () => {
    const childCount = children.length + 1;
    const newChild = (
      <RecursiveInput
        key={childCount}
        parentCount={parentCount + value.length}
        // onDelete={() => removeChild(childCount)}
      />
    );
    setChildren([...children, newChild]);
    // console.log(children);
  };

  const removeChild = (childCount: number) => {
    setChildren(children.filter((_, i) => i !== childCount - 1));
  };

  return (
    <div className="child--input">
      <h2>Characters in children: {parentCount}</h2>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter some text" />
      <div className="input--button--div">
        <button className="add" id="input--button" onClick={addChild}>
          Add child
        </button>
        <button
          className="delete"
          id="input--button"
          onClick={() => removeChild}
        >
          Delete element
        </button>
      </div>
      {children.map((child) => (
        <div
          id={`${children.length % 2 === 0 ? "grey" : "white"}`}
          key={child.key}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
