import React, { useState } from '@blocklet/pages-kit/builtin/react';
import { Box, Typography, Select, MenuItem, Button, IconButton } from '@blocklet/pages-kit/builtin/mui/material';

export default function StoreCard({
  title = 'Default Title',
  subtitle = 'Default Subtitle',
  image1,
  image2,
  image3,
  smallpayB = '',
  smallpayW = '',
  mediumpayB = '',
  mediumpayW = '',
  largepayB = '',
  largepayW = '',
  xlargepayB = '',
  xlargepayW = '',
  fontFamily = 'Arial, sans-serif',
  cardColor = '#fff',
  fontColor = '#000',
  fontSize = 'medium',
  backgroundColor = '#f4f4f4',
  centerText = false,
}) {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [image1?.url, image2?.url, image3?.url].filter(Boolean);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handlePayment = () => {
    let paymentLink;

    if (selectedColor === 'Black') {
      switch (selectedSize) {
        case 'small':
          paymentLink = smallpayB;
          break;
        case 'medium':
          paymentLink = mediumpayB;
          break;
        case 'large':
          paymentLink = largepayB;
          break;
        case 'xlarge':
          paymentLink = xlargepayB;
          break;
        default:
          paymentLink = null;
      }
    } else if (selectedColor === 'White') {
      switch (selectedSize) {
        case 'small':
          paymentLink = smallpayW;
          break;
        case 'medium':
          paymentLink = mediumpayW;
          break;
        case 'large':
          paymentLink = largepayW;
          break;
        case 'xlarge':
          paymentLink = xlargepayW;
          break;
        default:
          paymentLink = null;
      }
    }

    if (paymentLink) {
      window.open(paymentLink, '_blank');
    } else {
      alert('No payment link available for the selected size and color.');
    }
  };

  const fontSizeMapping = {
    small: '12px',
    medium: '16px',
    large: '20px',
  };

  const appliedFontSize = fontSizeMapping[fontSize] || fontSizeMapping.medium;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: backgroundColor,
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          maxWidth: '300px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: cardColor,
          fontFamily: fontFamily,
          color: fontColor,
          textAlign: centerText ? 'center' : 'left',
        }}
      >
        {/* Image Slider with Magnify on Hover */}
        <Box
          sx={{ position: 'relative', marginBottom: '16px', overflow: 'hidden' }}
        >
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex]}
              alt={`slider-${currentImageIndex}`}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                transition: 'transform 0.3s ease-in-out',
                cursor: isHovered ? 'zoom-in' : 'default',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          ) : (
            <Typography variant="body2" sx={{ marginBottom: '16px' }}>
              No image provided.
            </Typography>
          )}
          {images.length > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  cursor: 'pointer',
                  fontSize: '20px',
                  padding: '4px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                {'<'}
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={{
                  cursor: 'pointer',
                  fontSize: '20px',
                  padding: '4px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                {'>'}
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Title and Subtitle */}
        <Typography
          variant="h6"
          sx={{ marginBottom: '8px', fontFamily, fontSize: appliedFontSize }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: '16px', fontFamily, fontSize: appliedFontSize }}
        >
          {subtitle}
        </Typography>

        {/* Size and Color Selection */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          <Select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            sx={{
              flex: '1',
              fontFamily,
              color: fontColor,
            }}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
            <MenuItem value="xlarge">X-Large</MenuItem>
          </Select>
          <Select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            sx={{
              flex: '1',
              fontFamily,
              color: fontColor,
            }}
          >
            <MenuItem value="Black">Black</MenuItem>
            <MenuItem value="White">White</MenuItem>
          </Select>
        </Box>

        {/* Fixed Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          sx={{
            width: '100%',
            fontFamily,
          }}
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
}