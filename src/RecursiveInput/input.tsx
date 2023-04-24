import React, { useState } from "react";
import RecursiveInput from "./recursive_input";
interface Props {
  removeChild: (childCount: number) => void;
}
export default function ParentInput(props: Props) {
  const { removeChild } = props;
  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);

  return (
    <>
      <div>
        <label htmlFor="parentInput">Characters in children:{}</label>
      </div>
      <div>
        <input
          id="parentInput"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          placeholder="Enter some text"
        />
      </div>
      <div>
        <button onClick={() => setActive(!active)}>Add</button>
        <div>
          {active && (
            <RecursiveInput
              parentCount={0}
              onDelete={(childCount: number) => removeChild(childCount)}
            />
          )}
        </div>
      </div>
    </>
  );
}
