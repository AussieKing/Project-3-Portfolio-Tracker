import { styled } from "@mui/material/styles";

const StyledButton = styled('span')(({ theme, selected }) => ({  // we want a span element, and we want to pass the theme and selected props.
  border: "1px solid gold",
  borderRadius: 5,
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  fontFamily: "Montserrat",
  cursor: "pointer",
  backgroundColor: selected ? "goldenrod" : "",
  color: selected ? "black" : "",
  fontWeight: selected ? 700 : 500,
  "&:hover": {
    backgroundColor: "goldenrod",
    color: "black",
  },
  width: "22%",
  // margin: 5, // Uncomment if you need the margin
}));

const SelectButton = ({ children, selected, onClick }) => {  // takes the children, selected and onClick props.
  return (  // returns the StyledButton component, passing the onClick and selected props.
    <StyledButton onClick={onClick} selected={selected}>
      {children}
    </StyledButton>
  );
};

export default SelectButton;
