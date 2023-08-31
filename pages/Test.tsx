import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface ValueInputProps {
  initialValue?: string;
}

const ValueInput: React.FC<ValueInputProps> = ({ initialValue = "" }) => {
  const [cultivationLoan, setCultivationLoan] = useState("");
  const [isCultivationLoan, setIsCultivationLoan] = useState("");

  const handleCultivationLoanChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsCultivationLoan(event.target.value);
    setCultivationLoan("");
  };

  return (
    <div>
        <label></label>
      <TextField
        select
        //label="Cultivation loan?"
        value={isCultivationLoan}
        onChange={handleCultivationLoanChange}
        variant="outlined"
      >
        <MenuItem value="">Select an Option</MenuItem>
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </TextField>
      <TextField
        label="Cultivation loan?"
        value={cultivationLoan}
        onChange={(e) => setCultivationLoan(e.target.value)}
        variant="outlined"
        disabled={isCultivationLoan === "no" || isCultivationLoan === ""}
      />
      {/* <p>Value: {selectedOption === "no" ? "No" : inputValue || "Yes"}</p> */}
    </div>
  );
};

export default ValueInput;