import styled from "styled-components";
import React from "react";

const StyledTable = styled.div`

  background: white;
  font-size: 13px;
  line-height: 1.1;
  table {
    width: 100%;
    border-spacing: 0;
    border-radius:5px;
    margin: 0;
    padding: 15px 38px 15px 38px;
    border-collapse: separate;
    
  
  caption {
    padding: 10px 5px;
    background: white;
  }

  th {
    padding: 25px 5px 15px 5px;
    font-weight: 700;
    font-size:1.2em;
    background: white;
    border-bottom: 2px solid #f6f5fa;
    text-align: left; 
    &[title] {
      cursor: help;
    }
  }


  td {
    padding: 15px 5px;
    text-align: center;
    border-bottom: 2px solid #f6f5fa; 
    text-align: left;
    
  }
  th:first-child {
    border-top-left-radius: 25px;
  }
  th:last-child{
    border-top-right-radius: 25px;
  }
  tr:hover{
    background:#0000000a;
    
  }
}

tc_datatable__optional {
  display: none;
}

tc_datatable__overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 0;
}
}
`;

const Datatable = ({ children, className }) => {
  return (
    <StyledTable
      className={"tc_datatable " + className}
      style={{ borderRadius: "25px" }}
    >
      {children}
    </StyledTable>
  );
};

Datatable.defaultProps = {
  className: "",
};

export default Datatable;
