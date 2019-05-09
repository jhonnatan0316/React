import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const TrelloCard = React.memo(({ title, description, id, owner, createdDate, index}) => {

  const renderCard = () => {
    return (
        <Draggable draggableId={String(id)} index={index}>
          {provided => (
            <CardContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Card>
                <CardContent>
                <Typography>{title}</Typography>
                  <Typography>{description}</Typography>
                  <Typography>{owner}</Typography>
                  <Typography>{createdDate}</Typography>
                </CardContent>
              </Card>
            </CardContainer>
          )}
        </Draggable>
    );
  };

  return renderCard();
});

export default connect()(TrelloCard);