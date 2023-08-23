import React from "react";
import CreateTicketForm, {
  CreateTicketType,
  EditTicketType,
} from "../create/createTicketForm";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";

type EditTicketProps = {
  ticketId: string;
};

const EditTicket = ({ ticketId }: EditTicketProps) => {
  const onSubmit = (ticketData: CreateTicketType | EditTicketType) => {
    const requestBody = {
      defaultCount: ticketData.defaultCount,
      defaultTerm: ticketData.defaultTerm,
      defaultTermUnit: ticketData.defaultTermUnit,
      maxServiceCount: ticketData.maxServiceCount,
    };

    apiInstance
      .put(`/tickets/${ticketId}`, requestBody)
      .then((response) => {})
      .catch((error) => {});
  };

  return (
    <>
      <CreateTicketForm isEditMode={true} onSubmit={onSubmit} />
    </>
  );
};

export default EditTicket;
