import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { IconButton, Box, Stack } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

function MuiImageCarousel({ images, onImageClick }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;
  const intervalRef = useRef(null);

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  // 자동 재생 설정
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [total]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <Box
      position="relative"
      width="100%"
      sx={{ aspectRatio: "1 / 1" }}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <img
        src={images[current]}
        alt={`carousel-${current}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}
        onClick={() => onImageClick(images[current])}
      />

      {total > 1 && (
        <>
          {/* 좌우 화살표 */}
          <IconButton
            onClick={prev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.7)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            <ArrowBackIosNew fontSize="small" />
          </IconButton>

          <IconButton
            onClick={next}
            sx={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.7)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>

          {/* dot 인디케이터 */}
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            position="absolute"
            bottom={20}
            width="100%"
          >
            {images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: current === index ? "rgb(18,145,25)" : "#ccc",
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
}

MuiImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default MuiImageCarousel;
