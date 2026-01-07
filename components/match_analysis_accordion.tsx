'use client';

import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { Sword, TextSearch, Image as ImageIcon, Bot } from 'lucide-react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { getMatchEvents, getMatchVisionGraph } from '@/app/server_actions';
import Alert from 'react-bootstrap/Alert';
import MatchEventsTable from '@/components/match_events_table';
import Image from 'react-bootstrap/Image';

function MatchAnalysisAccordion() {
    const [activeKey, setActiveKey] = useState("0");
    const [matchId, setMatchId] = useState("");
    const [selectedMatchId, setSelectedMatchId] = useState("");
    const [error, setError] = useState<string|null>(null);
    const [matchEvents, setMatchEvents] = useState([]);
    const [selectedEnemySide, setSelectedEnemySide] = useState("");
    const [visionGraphUrl, setVisionGraphUrl] = useState("");

    const handleClickAccordionHeader = (eventKey: string)=>{
      console.log("Clicked AccordionHeader eventKey:", eventKey);
      setActiveKey(eventKey);
    }

    const handleClickConfirmMatchIdBtn = ()=>{
      console.log("Clicked ConfirmMatchIdBtn");
      console.log("matchId:", matchId);
      setSelectedMatchId(matchId);
      setActiveKey("1");
    };

    const handleGetMatchEventsBtn = async ()=>{
      // setError(null);
      console.log("Clicked getMatchEventsBtn");
      if (selectedMatchId == "") {
        setError("Please enter a valid match ID");
        return;
      }
      const response = await getMatchEvents(selectedMatchId);
      console.log("getMatchEvents response: ", response);
      if (response.error != null) {
        setError(response.error);
        return;
      }

      setError(null);
      setMatchEvents(response.data.events);
    };

    const handleChangeEnemySide = (e: any)=>{
      console.log("handleChangeEnemySide e.target.value:", e.target.value);
      setSelectedEnemySide(e.target.value);
    };

    const handleGetMatchVisionGraphBtn = async ()=>{
      console.log("Clicked getMatchVisionGraphBtn");
      if (selectedMatchId == "") {
        setError("Please enter a valid match ID");
        return;
      }

      if (selectedEnemySide == "") {
        setError("Please select the enemy side");
        return;
      }

      console.log("selectedEnemySide:", selectedEnemySide);

      const response = await getMatchVisionGraph(selectedMatchId, selectedEnemySide);
      console.log("getMatchEvents response: ", response);
      if (response.error != null) {
        setError(response.error);
        return;
      }

      setError(null);
      setVisionGraphUrl(response.data.url);
    };

    return <>
      {
        error ?
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
         {error}
        </Alert> : <></>
      }
      <Accordion activeKey={activeKey}>
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={()=>handleClickAccordionHeader("0")}>
            <Sword size={32} className="me-2"/>
            { selectedMatchId ? `Entered Match ID ${selectedMatchId}` : "Enter a match ID" }</Accordion.Header>
          <Accordion.Body className="p-4">
              <Form.Label htmlFor="match-id-input">Enter the ID of the match to analyze</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control id="match-id-input" aria-describedby="basic-addon3" onChange={(e) => setMatchId(e.target.value)}/>
                <Button variant="secondary" id="button-addon2" onClick={handleClickConfirmMatchIdBtn}>
                  Confirm
                </Button>
              </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={()=>handleClickAccordionHeader("1")}>
            <TextSearch size={32} className="me-2"/>
            Fetch match events data</Accordion.Header>
          <Accordion.Body className="p-4">
            <Button variant="secondary" onClick={handleGetMatchEventsBtn}>
                Fetch match events data
            </Button>
            {
              matchEvents.length == 0 ? <></> :
              <div className="mt-4 px-3">
                <MatchEventsTable matchEvents={matchEvents}></MatchEventsTable>
              </div>
            }
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={()=>handleClickAccordionHeader("2")}>
            <ImageIcon size={32} className="me-2"/>
            Generate match vision graph</Accordion.Header>
          <Accordion.Body className="p-4">
            
            <InputGroup className="mb-3">
            
              {/* <Form.Label className="mt-2 me-3">Enemy Side</Form.Label> */}
              <Form.Select onChange={handleChangeEnemySide}>
                <option value="">Select the enemy side to generate match vision graph for</option>
                <option value="Dire">Dire</option>
                <option value="Radiant">Radiant</option>
              </Form.Select>
            </InputGroup>
            <Button variant="secondary" className="mb-2" onClick={handleGetMatchVisionGraphBtn}>
                Generate match vision graph
            </Button>
            { visionGraphUrl != "" ? <Image className="mt-2" src={visionGraphUrl} fluid /> : <></> }
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header onClick={()=>handleClickAccordionHeader("3")}>
            <Bot size={32} className="me-2"/>
            Get AI analysis</Accordion.Header>
          <Accordion.Body>
            Get AI analysis
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>;
}

export default MatchAnalysisAccordion;