import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

interface ModalProps {
  hide?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  isSaveDisabled: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  hide,
  children,
  onSave,
  onDelete,
  isSaveDisabled,
}) => {
  const history = useHistory();
  const isEditTaskModalOpened = history.location.pathname !== "/new";

  return ReactDOM.createPortal(
    <ModalWrapper>
      <ModalBody>
        <CloseButtonWrapper>
          <CloseIcon className="material-icons" onClick={hide}>
            close
          </CloseIcon>
        </CloseButtonWrapper>
        <ModalHeader>
          {React.Children.map(children, (child, i) => i === 0 && child)}
        </ModalHeader>
        <ModalContent>
          {React.Children.map(
            children,
            (child, i) => i === 1 || (i === 2 && child)
          )}
        </ModalContent>
        <ModalFooter>
          <ActionButtonsWrapper>
            {isEditTaskModalOpened && (
              <ActionButton onClick={onDelete}>Delete</ActionButton>
            )}
            <ActionButton
              primary
              onClick={onSave}
              disabled={isSaveDisabled}
              title={"Use at least one #hashtag in text to enable save"}
            >
              Save
            </ActionButton>
          </ActionButtonsWrapper>
        </ModalFooter>
      </ModalBody>
    </ModalWrapper>,
    document.body
  );
};

const ModalHeader = styled.div`
  width: calc(100% - 40px);
  height: 50px;
  padding: 0 20px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(p) => p.theme.modal.header.color};
`;

const ActionButtonsWrapper = styled.div`
  width: fit-content;
  align-items: center;
  display: flex;
  margin-right: 5px;
`;

interface ActionButtonProps {
  primary?: boolean;
  disabled?: boolean;
}
const ActionButton = styled.button<ActionButtonProps>`
  text-transform: uppercase;
  padding: 10px 25px;
  border: none;
  background: white;
  margin-left: 5px;
  border-radius: 3px;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? "0.4" : "1")};
  font-family: ${(p) => p.theme.font.basic.family};
  font-size: ${(p) => p.theme.font.size.medium};
  background: ${(p) =>
    p.primary ? p.theme.button.color : p.theme.modal.secondaryBtn.bg};
  color: ${(p) => (p.primary ? "white" : p.theme.font.color)};
  :hover {
    opacity: ${(p) => (p.disabled ? "0.4" : "0.8")};
  }
`;

const ModalFooter = styled.div`
  position: absolute;
  margin-bottom: 25px;
  right: 20px;
  bottom: 0;
  width: calc(100% - 60px);
  display: flex;
  justify-content: flex-end;
`;

const ModalContent = styled.div``;

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseIcon = styled.span`
  cursor: pointer;
  padding: 5px;
  color: ${(p) => p.theme.modal.header.color};
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  font-family: "Open Sans";
  background: ${(p) => p.theme.modal.bgColor};
`;

const ModalBody = styled.div`
  width: 80%;
  max-width: 750px;
  height: 450px;
  border-radius: 5px;
  position: relative;
  padding: 20px;
  background: ${(p) => p.theme.task.bg};
  box-shadow: ${(p) => p.theme.modal.shadow};
`;
