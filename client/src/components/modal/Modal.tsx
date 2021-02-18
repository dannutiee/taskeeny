import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModalProps {
  isShowing: boolean;
  hide?: () => void;
}
// TODO this component requires refactor

export const Modal: React.FC<ModalProps> = ({ isShowing, hide, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <ModalWrapper>
          <ModalBody>
            <CloseButtonWrapper>
              <CloseIcon className="material-icons" onClick={hide}>
                close
              </CloseIcon>
            </CloseButtonWrapper>
            <ModalHeader>
              <StatusWrapper>
                <Label>Status: </Label>
                <select>
                  <option value="TO DO">TO DO</option>
                  <option value="IN PROGRESS">N PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </StatusWrapper>
              <DateInfoWrapper>
                <DateItem>
                  <Label>Created:</Label> 19.02.1996
                </DateItem>
                <DateItem>
                  <Label>Completed:</Label> -
                </DateItem>
              </DateInfoWrapper>
            </ModalHeader>
            <ModalContent>{children}</ModalContent>
            <ModalFooter>
              <ActionButtonsWrapper>
                <ActionButton>Delete</ActionButton>
                <ActionButton primary>Save</ActionButton>
              </ActionButtonsWrapper>
            </ModalFooter>
          </ModalBody>
        </ModalWrapper>,
        document.body
      )
    : null;

const Label = styled.span`
  font-weight: 600;
`;

const DateItem = styled.span`
  margin-left: 25px;
`;

const DateInfoWrapper = styled.div``;

const StatusWrapper = styled.div``;

const ModalHeader = styled.div`
  width: calc(100% - 40px);
  height: 50px;
  padding: 0 20px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButtonsWrapper = styled.div`
  width: fit-content;
  align-items: center;
  display: flex;
  margin-right: 5px;
`;

interface ActionButtonProps {
  primary?: boolean;
}
const ActionButton = styled.button<ActionButtonProps>`
  text-transform: uppercase;
  padding: 15px 25px;
  border: none;
  background: white;
  margin-left: 5px;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  font-family: "Open Sans";
  background: ${(p) => (p.primary ? "#90b9fc" : "white")};
  color: ${(p) => (p.primary ? "white" : "#cacbce")};
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
`;

const ModalWrapper = styled.div`
  position: absolute;
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
  background: white;
  width: 80%;
  max-width: 750px;
  height: 450px;
  border-radius: 5px;
  position: relative;
  padding: 20px;
  box-shadow: ${(p) => p.theme.modal.shadow};
`;
