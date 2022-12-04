import styled from "styled-components";

const StyledButton = styled.button<{ variant: string }>`
  padding: 7px 10px;
  outline: none;
  background:${({ variant }) => (variant === "outlined" ? "none" : "#7900ff")}
  border: 2px solid #7900ff;
  color: #cfffdc;
  cursor: pointer;
  margin: 2px;

  &:hover {
    background: #cfffdc;
    color: #0f0e11;
  }
`;

interface Post {
  id: string;
}

interface ButtonProps {
  btnText?: string | number;
  isPublished?: Boolean;
  post?: Post;
  onClick: () => void;
  variant: string;
}
const Button: React.FC<ButtonProps> = ({ onClick, variant }) => {
  return <StyledButton onClick={onClick} variant={variant}></StyledButton>;
};

export default Button;
