import React, { useRef, useEffect, useState } from "react";
import { Button, TextField, Container, Box } from "@mui/material";

const imageUrl = "src/assets/FactionBackgrounds/AoS4DefaultTemplate.png"; // Replace with your image URL

const drawImageOnCanvas = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

const drawTextOnCanvas = (context: CanvasRenderingContext2D, text: string) => {
  context.font = "28px Arial";
  context.fillStyle = "red";
  context.fillText(text, 88, 70); // Change the coordinates as needed
};

const drawTextOnCanvasSave = (
  context: CanvasRenderingContext2D,
  text: string
) => {
  context.font = "28px Arial";
  context.fillStyle = "red";
  context.fillText(text, 110, 100); // Change the coordinates as needed
};

const UnitCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("");
  const imageRef = useRef<HTMLImageElement>(new Image());

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = imageRef.current;

    image.src = imageUrl;
    image.onload = () => {
      if (context && canvas) {
        drawImageOnCanvas(context, image, canvas);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = imageRef.current;

    if (context && canvas) {
      drawImageOnCanvas(context, image, canvas);
      if (text) {
        drawTextOnCanvas(context, text);
        drawTextOnCanvasSave(context, text);
      }
    }
  }, [text]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "image-with-text.png";
      link.click();
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 2,
        border: "dashed purple",
        width: 1,
        marginTop: 8,
      }}
    >
      <Container>
        <canvas
          ref={canvasRef}
          width={600}
          height={800}
          style={{ border: "1px solid #000" }}
        />
        <TextField
          value={text}
          onChange={handleTextChange}
          label="Text to Add"
          variant="outlined"
        />
        <TextField
          value={text}
          onChange={handleTextChange}
          label="Text to Add2"
          variant="outlined"
        />
        <Button
          onClick={handleDownloadImage}
          variant="contained"
          color="secondary"
          style={{ margin: "10px" }}
        >
          Download Image
        </Button>
      </Container>
    </Box>
  );
};

export default UnitCard;
