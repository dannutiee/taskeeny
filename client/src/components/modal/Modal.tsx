import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModalProps {
  isShowing: boolean;
  hide?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <ModalWrapper>
          <ModalContent>
            <TagBorderWrapper />
            <CloseButtonWrapper>
              <CloseIcon className="material-icons" onClick={hide}>
                close
              </CloseIcon>
            </CloseButtonWrapper>
            //TODO addTask modal
          </ModalContent>
        </ModalWrapper>,
        document.body
      )
    : null;

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
  background: ${(p) => p.theme.modal.bgColor};
`;

const ModalContent = styled.div`
  background: white;
  width: 80%;
  max-width: 750px;
  height: 450px;
  border-radius: 5px;
  position: relative;
  padding: 20px;
  box-shadow: ${(p) => p.theme.modal.shadow};
`;

const TagBorderWrapper = styled.div`
  position: absolute;
  height: calc(100% - 10px);
  width: 10px;
  left: 5px;
  top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
