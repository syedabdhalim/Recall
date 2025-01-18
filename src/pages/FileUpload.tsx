import React, { useState } from "react";
import { Box, Typography, Button, Alert, Checkbox, FormControlLabel } from "@mui/material";
import excelIcon from "../assets/excel-icon.png";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { read, utils } from "xlsx";

interface FileUploadProps {
  onUpload: (flashcards: { front: string; back: string }[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_EXTENSIONS = [".xls", ".xlsx"];

  const handleFileValidation = (file: File) => {
    setErrorMessage(null); 

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File size exceeds the maximum limit of 10MB.");
      return false;
    }

    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      setErrorMessage("Unsupported file type. Please upload an XLS or XLSX file.");
      return false;
    }

    return true;
  };

  const handleFileUpload = (file: File) => {
    if (!handleFileValidation(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        let rows = utils.sheet_to_json<{ front: string; back: string }>(sheet);

        if (rows.length && rows[0].front && rows[0].back) {
          if (shuffle) {
            rows = shuffleArray(rows);
          }
          onUpload(rows);
        } else {
          setErrorMessage("Invalid file format. Ensure 'front' and 'back' columns exist.");
        }
      } catch {
        setErrorMessage("An error occurred while reading the file. Please try again.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: 2,
      }}
    >
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}



      <Box
        sx={{
          width: "100%",
          height: "120px",
          border: "2px dashed #1976d2",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 2,
          backgroundColor: isDragging ? "#e3f2fd" : "#f9f9f9", // Highlight when dragging
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadFileIcon fontSize="large" color="primary" />
        <Typography variant="body1" sx={{ fontWeight: "bold", marginY: 1 }}>
          Drag and Drop file here or{" "}
          <Button variant="text" component="label">
            Choose file
            <input
              type="file"
              hidden
              accept=".xls,.xlsx"
              onChange={handleFileInputChange}
            />
          </Button>
        </Typography>
      </Box>
      {/* Shuffle Option */}
      <FormControlLabel
        control={<Checkbox checked={shuffle} onChange={(e) => setShuffle(e.target.checked)} />}
        label="Shuffle flashcards"
      />
      {/* File Format and Size Info */}
      <Typography
        variant="body2"
        sx={{
          color: "#666",
          textAlign: "center",
        }}
      >
        Supported formats: <strong>XLS, XLSX</strong> | Maximum size:{" "}
        <strong>10MB</strong>
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "16px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={excelIcon}
            alt="Excel Icon"
            style={{
              width: "30px",
              height: "30px",
            }}
          />
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              File Example
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              You can download the attached example and use it as a starting
              point for your own file.
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            padding: "6px 16px",
          }}
          href="/sample.xlsx"
          download
        >
          Download
        </Button>
      </Box>
    </Box>
  );
};

export default FileUpload;
