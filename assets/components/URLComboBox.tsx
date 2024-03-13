"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  MenuItem,
  Segment,
} from "semantic-ui-react";
import { URLComboBoxProps } from "./types";

const URLComboBox = ({
  URLDropdownOptions,
  allowURLEntry,
  onChange,
  onSubmit,
  ...props
}: URLComboBoxProps) => {
  const [value, setValue] = useState("");
  return (
    <>
      <Dropdown
        placeholder="Select Model"
        fluid
        selection
        onChange={(event, { value }) => setValue(value)}
        options={URLDropdownOptions.map((option, index) => {
          return {
            key: index,
            text: option.title,
            value: option.modelURL,
            image: { src: option.thumbURL },
          };
          {
            props;
          }
        })}
      />
      <Button onClick={() => onSubmit(value)}>Add</Button>
      <Input
        disabled={!allowURLEntry}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New Model URL..."
      />
    </>
  );
};

export default URLComboBox;
