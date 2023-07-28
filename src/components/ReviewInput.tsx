import React from "react";

type InputFormProps = {
  text: string;
};

const ReviewInput = ({ text }: InputFormProps) => (
  <input type="text" value={text}/>
);

export default ReviewInput;