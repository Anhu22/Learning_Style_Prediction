import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// 🌱 Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #dff6ff;
  min-height: 100vh;
  padding: 20px;
`;

const Diagram = styled.div`
  position: relative;
  background: url("https://www.shutterstock.com/image-vector/diagram-showing-process-photosynthesis-illustration-260nw-563007307.jpg")
    no-repeat;
  width: 400px;
  height: 350px;
  display: block;
  margin: 20px auto;
  background-position: center center;
  background-size: contain;
`;

const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const DropZone = styled.div`
  position: absolute;
  width: 70px;
  height: 30px;
  border: 3px dashed #444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #333;
  background: #fff;
`;

const Item = styled.div`
  padding: 10px 15px;
  margin: 8px 0;
  font-size: 16px;
  align-items: center;
  justify-content: center;
`;

const Word = styled.div`
  padding: 5px 10px;
  background: #fff;
  border: 2px solid #333;
  border-radius: 8px;
  cursor: grab;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  background-color: #4caf50;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #43a047;
    transform: scale(1.05);
  }
`;

const ProceedButton = styled(SubmitButton)`
  background-color: #43a047;
  &:hover {
    background-color: #2e7d32;
  }
`;

const KinestheticPhotosynthesis = () => {
  const initialWords = ["Sunlight", "Water"];
  const [zones, setZones] = useState({
    sunlight: null,
    water: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // 🧩 Handle drag-and-drop logic
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    setZones((prev) => ({
      ...prev,
      [destination.droppableId]: draggableId,
    }));
  };

  // ✅ Check if all drop zones are filled
  const allPlaced = Object.values(zones).every((val) => val !== null);

  const handleSubmit = () => {
    alert("✅ Well done! You’ve successfully completed the activity!");
    setSubmitted(true);
  };

  const handleProceed = () => {
    navigate("/kinesthetic_quiz2"); // 👉 Change this to your next route
  };

  return (
    <Wrapper>
      <h1>🌿 Photosynthesis</h1>
      <Container>
        {!submitted ? (
          <>
            <Item>
              <h2 style={{ textAlign: "center" }}>Instruction :-</h2>
              <strong>Step 1:</strong> Read the labels of the given Image Carefully.
              <br />
              <strong>Step 2:</strong> Click on the button below to start your activity.
              <br />
              <strong>Step 3:</strong> Drag and drop the labels to their correct positions on the diagram.
              <br />
              <strong>Step 4:</strong> Once you are satisfied with your arrangement, click the "Submit" button.
              <br />
              Good luck and have fun learning about photosynthesis!
            </Item>
            <Diagram></Diagram>

            <h2 style={{ textAlign: "center", marginTop: "20px" }}>
              Practice Before Starting The Activity
            </h2>

            {/* ✅ Drag and Drop Area */}
            <DragDropContext onDragEnd={onDragEnd}>
              <Diagram>
                {/* Drop Zones */}
                <Droppable droppableId="sunlight">
                  {(provided) => (
                    <DropZone
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ top: "75px", left: "65px" }}
                    >
                      {zones.sunlight && (
                        <Draggable draggableId={zones.sunlight} index={0}>
                          {(provided) => (
                            <Word
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {zones.sunlight}
                            </Word>
                          )}
                        </Draggable>
                      )}
                      {provided.placeholder}
                    </DropZone>
                  )}
                </Droppable>

                <Droppable droppableId="water">
                  {(provided) => (
                    <DropZone
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ top: "240px", left: "50px" }}
                    >
                      {zones.water && (
                        <Draggable draggableId={zones.water} index={0}>
                          {(provided) => (
                            <Word
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {zones.water}
                            </Word>
                          )}
                        </Draggable>
                      )}
                      {provided.placeholder}
                    </DropZone>
                  )}
                </Droppable>
              </Diagram>

              {/* Draggable Words */}
              <Droppable droppableId="wordList" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "30px",
                      justifyContent: "center",
                    }}
                  >
                    {initialWords.map((word, index) => (
                      <Draggable key={word} draggableId={word} index={index}>
                        {(provided) => (
                          <Word
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {word}
                          </Word>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* ✅ Submit Button appears only when all are placed */}
            {allPlaced && <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>}
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h3>✅ Activity Completed!</h3>
            <p>Great job labeling the diagram correctly.</p>
            <ProceedButton onClick={handleProceed}>Proceed ➡️</ProceedButton>
          </div>
        )}
      </Container>
    </Wrapper>
  );
};

export default KinestheticPhotosynthesis;
