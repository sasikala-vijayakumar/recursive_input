import React, { useState, useEffect } from "react";
import "./recursive_input.css";

interface Props {
  parentCount: number;
  onDelete: (childCount: number) => void;
}
export default function RecursiveInput(props: Props) {
  const { parentCount } = props;
  const [text, setText] = useState("");
  const [children, setChildren] = useState<JSX.Element[]>([]);

  const addChild = () => {
    const childCount = children.length + 1;
    const newChild = (
      <RecursiveInput
        key={childCount}
        parentCount={parentCount + text.length}
        onDelete={() => removeChild(childCount)}
        />
        );
        setChildren([...children, newChild]);
        console.log(children);
  };

  const removeChild = (childCount: number) => {
    setChildren(children.filter((_, i) => i !== childCount - 1));
  };

  return (
    <div>
      <h2>Characters in children: {parentCount}</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addChild}>Add child</button>
      <button onClick={() => removeChild}>Delete element</button>
      {children.map((child) => (
        <div key={child.key}>{child}</div>
      ))}
    </div>
  );
}
