import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { taskStatus } from "../task/utils";

interface ModalProps {
  status: string;
  setNewStatus?: (status: string) => void;
  hide?: () => void;
  onSave?: () => void;
}
// TODO this component requires refactor

export const Modal: React.FC<ModalProps> = ({
  hide,
  children,
  onSave,
  status,
  setNewStatus,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    if (setNewStatus) {
      setNewStatus(currentStatus);
    }
  }, [currentStatus]);

  const onSelectNewStatus = (e: React.FormEvent<HTMLSelectElement>) => {
    const value: string = e.currentTarget.value;
    setCurrentStatus(value);
  };

  return ReactDOM.createPortal(
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
            <SelectDropdown
              onChange={onSelectNewStatus}
              defaultValue={currentStatus}
            >
              <option value={taskStatus.todo.value}>
                {taskStatus.todo.label}
              </option>
              <option value={taskStatus.in_progress.value}>
                {taskStatus.in_progress.label}
              </option>
              <option value={taskStatus.completed.value}>
                {taskStatus.completed.label}
              </option>
            </SelectDropdown>
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
            <ActionButton primary onClick={onSave}>
              Save
            </ActionButton>
          </ActionButtonsWrapper>
        </ModalFooter>
      </ModalBody>
    </ModalWrapper>,
    document.body
  );
};

const Label = styled.span`
  font-weight: 600;
`;

const DateItem = styled.span`
  margin-left: 25px;
`;

const SelectDropdown = styled.select`
  border-color: #79a7ff;
  border-radius: 3px;
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
  cursor: pointer;
  font-family: ${(p) => p.theme.font.basic.family};
  font-size: ${(p) => p.theme.font.size.medium};
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
