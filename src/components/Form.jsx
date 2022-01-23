import React, { useState } from "react";
import axios from "axios";

export const Form=()=>{


const [selectedFile, setSelectedFile] = React.useState(null);
const [message, setMessage]=useState(' ');
const [isLoading, setLoading] = useState(false);
const [visibleSubmit, setVisibleSubmit] = useState('');


const handleSubmit = async (event) => {
  event.preventDefault()
  const formData = new FormData();
  formData.append("file", selectedFile);
  console.log(formData)
  try {
    setLoading(true);
    const response = await axios({
      method: "post",
      url: "/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(response.status===200){
        setLoading(false);
        setMessage ("File uploaded successfully");
        setVisibleSubmit('disabled');
    }
  } catch(error) {
    setLoading(false);
    console.log(error)
    setMessage ("Wrong! File is not uploaded.")
  }
}

const handleFileSelect = (event) => {
  setSelectedFile(event.target.files[0])
  console.log(event.target.files[0])
  setVisibleSubmit('')
}


if (isLoading) {
  return (
  <div className="App">Loading...</div>
  )
}

return (
    <div>
      <div id="form-title">
        <h5>Upload file below:</h5>
      </div>  
   
      <div id="form-submission">
        <form onSubmit={handleSubmit}>
          <input type="file" id="choose-file" class="hidden"  onChange={handleFileSelect} accept=".csv"/>
          <input type="submit" value="Upload File" disabled={`${visibleSubmit}`}/>
        </form>
      </div>

    {
        message
    }
    </div>
           
)

};