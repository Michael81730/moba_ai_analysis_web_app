import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useState } from "react";

function MatchEventsTable({matchEvents}: any) {
    console.log('MatchEventsTable matchEvents:', matchEvents);
    const headers = Object.keys(matchEvents[0]);
    const pageSize = 10;
    const pageCount = Math.ceil(matchEvents.length / pageSize);
    console.log("matchEvents.length:", matchEvents.length);
    console.log("pageCount:", pageCount);
    const [ page, setPage ] = useState(0);

    const pageinationItems = [];
    for(let i=0; i<pageCount; i++) {
      pageinationItems.push(
      <Pagination.Item key={`page_${i}`} active={page==i} onClick={()=>{setPage(i)}}>
        {i+1}
      </Pagination.Item>);
    }
    
    let pageStart = page*pageSize;
    let pageMatchEvents = matchEvents.slice(pageStart, pageStart+pageSize);

    return <>
    <Pagination>
      <Pagination.First onClick={()=>{setPage(0)}}/>
      <Pagination.Prev onClick={()=>{setPage(Math.max(page-1,0))}}/>
      {pageinationItems}
      <Pagination.Next onClick={()=>{setPage(Math.min(page+1,pageCount-1))}}/>
      <Pagination.Last onClick={()=>{setPage(pageCount-1)}}/>
    </Pagination>
    <Table bordered hover responsive>
      <thead>
        <tr>
          {headers.map((header, _)=>{
              return <th key={`header_${header}`}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {pageMatchEvents.map((matchEvent: any, index: number)=>{
          return <tr key={`event_${index}`}>
             {  headers.map((header, _)=>{
                  return <td key={`event_${index}_${header}`}>{matchEvent[header]}</td>;
             })}
          </tr>;
        })}
      </tbody>
    </Table>
  </>;
}

export default MatchEventsTable;