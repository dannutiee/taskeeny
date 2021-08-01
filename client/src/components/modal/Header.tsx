import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { Dropdown } from "../dropdown";
import { taskStatus } from "../task/utils";

interface HeaderProps {
  status: string;
  createdAt: string;
  completedAt: string;
  setNewStatus?: (status: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  status,
  setNewStatus,
  createdAt,
  completedAt,
}) => {
  const history = useHistory();
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    if (setNewStatus) {
      setNewStatus(currentStatus);
      toggleWindowScroll("hidden");
    }
  }, [currentStatus]);

  useEffect(() => {
    return () => {
      toggleWindowScroll("visible");
    };
  }, []);

  const toggleWindowScroll = (overflow: string) => {
    document.body.style.overflow = overflow;
  };

  const options = [
    {
      text: taskStatus.todo.label,
      value: taskStatus.todo.value,
    },
    {
      text: taskStatus.in_progress.label,
      value: taskStatus.in_progress.value,
    },
    {
      text: taskStatus.completed.label,
      value: taskStatus.completed.value,
    },
  ];

  //TODO move it to utils
  const pareDateToDisplay = (isoStringDate: string): string => {
    if (!isoStringDate) {
      return "-";
    }
    const date = moment(isoStringDate);
    const parsedDate = date.utc().format("DD.MM.YYYY");
    return parsedDate;
  };

  const isEditTaskModalOpened = history.location.pathname !== "/new";

  return (
    <>
      <StatusWrapper>
        <Label>Status: </Label>
        <Dropdown
          options={options}
          value={currentStatus}
          onSelectOption={setCurrentStatus}
        />
      </StatusWrapper>
      {isEditTaskModalOpened && (
        <DateInfoWrapper>
          <DateItem>
            <Label>Created:</Label> {pareDateToDisplay(createdAt)}
          </DateItem>
          <DateItem>
            <Label>Completed:</Label> {pareDateToDisplay(completedAt)}
          </DateItem>
        </DateInfoWrapper>
      )}
    </>
  );
};

const Label = styled.span`
  font-weight: 600;
  margin-right: 10px;
`;

const DateItem = styled.span`
  margin-left: 25px;
`;

const DateInfoWrapper = styled.div``;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;
