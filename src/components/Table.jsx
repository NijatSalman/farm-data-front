import React, { useEffect, useState } from "react";
import axios from "axios";

export const Table=()=>{

    const [offset,setOffset]=useState(0);
    const [pageSize,setPageSize]=useState(10);
    const [totalPages,setTotalPages]=useState();
    const [farmData,setFarmData]=useState([]);
    const [isLoading, setLoading] = useState(true);
    const [currentPage,setCurrentPage]=useState(offset+1);
    const [inputFieldPageNumber, setInputFieldPageNumber]=useState(1);

    useEffect(() => {
        const getFarmData = async () => {
            let res=[];
          try {
                res=await axios.get(`/select/${offset}/${pageSize}`);
            setFarmData(res.data);
            setTotalPages(res.data.totalPages);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        getFarmData();
      }, [offset],[pageSize]);


       
     const showPrevPage = async (event) => {
        let prevPage = 1
        if(currentPage > prevPage){
            setOffset(currentPage-prevPage);
            setCurrentPage(currentPage-prevPage);
        }
    };

    const showNextPage = async (event) => {
        if(currentPage < totalPages){
            setOffset(currentPage+1);
            setCurrentPage(currentPage+1);
        }
    };

      if (isLoading) {
        return <div className="App">Loading...</div>;
      }
        
      function pageNumber () {
          let valueInput=Number.parseInt( inputFieldPageNumber, 10)
          if(inputFieldPageNumber>=0){
            setOffset(valueInput);
            setCurrentPage(valueInput);
          }
      }

      
return (
    <div>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Location</th>
                <th scope="col">Date</th>
                <th scope="col">Sensor Type</th>
                <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                                {farmData.list.length===0?
                                    <tr align="center"><td colSpan="5">No Record Found</td></tr>:
                                    farmData.list.map((farm) =>(
                                            
                                            <tr key = {farm.id}>
                                                    <td>{farm.location}</td>
                                                    <td>{farm.datetime}</td>
                                                    <td>{farm.sensorType}</td>
                                                    <td>{farm.value}</td>
                                            </tr>
                                        )
                                    )
                                }
                </tbody>
        </table>

    

    <div id="table-button">
        <div id="table-buttons">
            <button type="button"  style={{margin: "15px 6px", padding: "8px", fontSize: "14px"}} class="btn btn-dark" disabled={currentPage===1?true:false} onClick={()=>showPrevPage()}>Previous</button>
            <button type="button"  style={{margin: "15px 6px",  padding: "8px", fontSize: "14px",}} class="btn btn-dark" disabled={totalPages===(currentPage+1)?true:false} onClick={()=>showNextPage()}>Next</button>
        </div>
        <div id="table-input">
            <label>
                <input value={inputFieldPageNumber} onInput={e => setInputFieldPageNumber(e.target.value)}/>
                <label>{currentPage}</label>
                <label>/</label>
                <label>{totalPages-1}</label>
                <input type='submit' onClick={() => pageNumber() }></input>
            </label>
        </div>
    </div>
      
    </div>
        
)

};