import styled from "styled-components";

export const EditContent = styled.div`
  padding: 20px;
  font-size: ${(p) => p.theme.font.size.big};
`;

export const TaskTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  border: none;
  &:focus-visible {
    outline: none;
  }
  font-family: ${(p) => p.theme.font.basic.family};
  font-size: ${(p) => p.theme.font.size.medium};
`;

export const EditableArea = styled.div`
  position: relative;
`;

export const TextareaVisibleResult = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  color: transparent;
  .hashtag:hover {
    cursor: pointer;
  }
  font-size: ${(p) => p.theme.font.size.big};
  font-family: ${(p) => p.theme.font.basic.family};
`;
export const InvisibleTextArea = styled(TaskTextArea)`
  background: transparent;
  position: relative;
  z-index: 10;
  padding: 0;
  font-family: ${(p) => p.theme.font.basic.family};
  font-size: ${(p) => p.theme.font.size.big};
`;
