import { Backdrop, CircularProgress } from "@mui/material";
import styled, { keyframes } from "styled-components";

// Define keyframes for the spinner animation
const l7 = keyframes`
  to {
    transform: rotate(.5turn);
  }
`;

// Styled component for the loader
const StyledLoader = styled.div`
  width: 50px;
  aspect-ratio: 1;
  --_c: no-repeat radial-gradient(farthest-side, #3f51b5 75%, #0000);
  background: var(--_c) top, var(--_c) left, var(--_c) right, var(--_c) bottom;
  background-size: 12px 12px;
  animation: ${l7} 1s infinite;
`;
export default function MainLoding({ isLoading }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <StyledLoader />
    </Backdrop>
  );
}
