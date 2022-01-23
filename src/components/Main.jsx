import React, { useEffect, useState } from "react";
import { Form } from "./Form";
import {Table} from "./Table";

export const Main=()=>{

  

return (
    <div>
        <header>
            <h1>Solita</h1>
        </header>  
    <div>
        <div id="form">
            <Form />
        </div>
        <div id="table">
            <Table />
        </div>
    </div>
  
    </div>   
)

};