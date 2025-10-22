import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ScoreContext } from "./ScoreProvider";

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
  background: url("/image/Photosynthesis.png") no-repeat center/contain;
  width: 600px;
  height: 450px;
  margin-top: 20px;
`;

const DropZone = styled.div`
  position: absolute;
  width: 140px;
  height: 70px;
  border: 3px dashed #444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #333;
  background: #fff;
`;

const WordBank = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Word = styled.div`
  padding: 10px 15px;
  background: #fff;
  border: 2px solid #333;
  border-radius: 8px;
  cursor: grab;
`;

const Timer = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  color: #333;
`;

// 📦 Initial draggable words
const initialWords = ["Sunlight", "Water", "Oxygen", "Carbon dioxide", "Sugars"];

// 📦 Drop zone ids
const dropZoneIds = ["sunlight", "water", "oxygen", "carbon", "sugar"];

const KinestheticPhotosynthesis = () => {
  const { setKinestheticScore } = useContext(ScoreContext);
  const navigate = useNavigate();
  const [bank, setBank] = useState(initialWords);
  const [zones, setZones] = useState({
    sunlight: null,
    water: null,
    oxygen: null,
    carbon: null,
    sugar: null,
  });

  const INITIAL_TIME = 300; // seconds (5 minutes)
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      calculateScore();
      navigate("/kinesthetic3");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  // Format mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // From bank → to zone
    if (source.droppableId === "bank" && dropZoneIds.includes(destination.droppableId)) {
      setBank(bank.filter((w) => w !== draggableId));
      setZones({ ...zones, [destination.droppableId]: draggableId });
    }

    // From zone → back to bank
    else if (dropZoneIds.includes(source.droppableId) && destination.droppableId === "bank") {
      setZones({ ...zones, [source.droppableId]: null });
      setBank([...bank, draggableId]);
    }
  };

  const allPlaced = Object.values(zones).every((z) => z !== null);

  const calculateScore = useCallback(() => {
    let newScore = 0;
    const correctAnswers = {
      sunlight: "Sunlight",
      water: "Water",
      oxygen: "Oxygen",
      carbon: "Carbon dioxide",
      sugar: "Sugars",
    };

    for (const [key, value] of Object.entries(zones)) {
      if (value === correctAnswers[key]) {
        newScore += 1;
      }
    }
  setKinestheticScore(newScore);
    localStorage.setItem("kinestheticQuizScore2", newScore.toString());

    // Save time taken for this quiz (in seconds)
    try {
      const timeTaken = Math.max(0, INITIAL_TIME - timeLeft);
      // match key pattern used elsewhere: `${chosenSection}QuizTime2` => 'kinestheticQuizTime2'
      localStorage.setItem("kinestheticQuizTime2", timeTaken.toString());
    } catch (e) {
      console.warn('Failed to save kinestheticQuizTime2', e);
    }
  }, [INITIAL_TIME, timeLeft, setKinestheticScore, zones]);

  return (
    <Wrapper>
      <h1>🌿 Photosynthesis Drag & Drop</h1>
      {/*<Timer>⏳ Time Left: {formatTime(timeLeft)}</Timer>*/}
      <p>Drag the labels from the word bank to their correct positions on the diagram.</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <Diagram>
          {/* Drop Zones */}
          <Droppable droppableId="sunlight">
            {(provided) => (
              <DropZone ref={provided.innerRef} {...provided.droppableProps} style={{ top: "100px", left: "80px" }}>
                {zones.sunlight && (
                  <Draggable draggableId={zones.sunlight} index={0}>
                    {(provided) => (
                      <Word ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {zones.sunlight}
                      </Word>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </DropZone>
            )}
          </Droppable>

          <Droppable droppableId="carbon">
            {(provided) => (
              <DropZone ref={provided.innerRef} {...provided.droppableProps} style={{ top: "220px", left: "55px" }}>
                {zones.carbon && (
                  <Draggable draggableId={zones.carbon} index={0}>
                    {(provided) => (
                      <Word ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {zones.carbon}
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
              <DropZone ref={provided.innerRef} {...provided.droppableProps} style={{ top: "340px", left: "60px" }}>
                {zones.water && (
                  <Draggable draggableId={zones.water} index={0}>
                    {(provided) => (
                      <Word ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {zones.water}
                      </Word>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </DropZone>
            )}
          </Droppable>

          <Droppable droppableId="oxygen">
            {(provided) => (
              <DropZone ref={provided.innerRef} {...provided.droppableProps} style={{ top: "120px", left: "440px" }}>
                {zones.oxygen && (
                  <Draggable draggableId={zones.oxygen} index={0}>
                    {(provided) => (
                      <Word ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {zones.oxygen}
                      </Word>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </DropZone>
            )}
          </Droppable>

          <Droppable droppableId="sugar">
            {(provided) => (
              <DropZone ref={provided.innerRef} {...provided.droppableProps} style={{ top: "280px", left: "460px" }}>
                {zones.sugar && (
                  <Draggable draggableId={zones.sugar} index={0}>
                    {(provided) => (
                      <Word ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {zones.sugar}
                      </Word>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </DropZone>
            )}
          </Droppable>
        </Diagram>

        {/* Word Bank */}
        <Droppable droppableId="bank" direction="horizontal">
          {(provided) => (
            <WordBank ref={provided.innerRef} {...provided.droppableProps}>
              {bank.map((word, index) => (
                <Draggable key={word} draggableId={word} index={index}>
                  {(provided) => (
                    <Word ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {word}
                    </Word>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </WordBank>
          )}
        </Droppable>
      </DragDropContext>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/*<button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            background: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/kinesthetic3")}
        >
          Skip ⏭️
        </button>*/}

        {allPlaced && (
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              background: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => {
              calculateScore();
              navigate("/kinesthetic3");
            }}
          >
            Submit ✅
          </button>
        )}
      </div>
    </Wrapper>
  );
};

export default KinestheticPhotosynthesis;
