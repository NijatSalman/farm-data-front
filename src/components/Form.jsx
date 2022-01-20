import React, { useState } from "react";
import axios from "axios";

export const Form=()=>{


const [selectedFile, setSelectedFile] = React.useState(null);
const [message, setMessage]=useState(' ');


const handleSubmit = async (event) => {
  event.preventDefault()
  const formData = new FormData();
  formData.append("file", selectedFile);
  console.log(formData)
  try {
    const response = await axios({
      method: "post",
      url: "/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(response.status===200){
        setMessage ("File uploaded successfully")
    }
  } catch(error) {
    console.log(error)
    setMessage ("Wrong! File is not uploaded.")
  }
}

const handleFileSelect = (event) => {
  setSelectedFile(event.target.files[0])
  console.log(event.target.files[0])
}

return (
    <div>
    <div>
    <h3>Form Page</h3>
    </div>  
   
    <div>
    <form onSubmit={handleSubmit}>
    <input type="file" onChange={handleFileSelect} accept=".csv"/>
    <input type="submit" value="Upload File"/>
   
    </form>
    </div>
    {
        message
    }
    </div>
           
)

};