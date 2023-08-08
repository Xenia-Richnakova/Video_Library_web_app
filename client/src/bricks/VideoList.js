import React, { useEffect } from "react";
import Video from "./Video";
import Row from 'react-bootstrap/Row';
import {useState} from "react"
import UploadVideo from "./UploadVideo";


// calling server to get DB_video.json
function getVideoList(filterCriteria , callBack) {
  fetch("/api/videos?" + new URLSearchParams({filterCriteria }).toString(), {
    method: "GET"
  })
    // I get all videos from res in string form and converting it to json (array)
    .then((res) => res.json())
    // second function .then is working with the result of the previous .then and calling some function with that data (setVideoList)
    .then((data) => callBack(data)) // => .then((data) => setVideoList(data))
}

function VideoList({searchCriteria}) {
  const [videoList, setVideoList] = useState([])
  const [refreshCount, setRefreshCount] = useState(0)
  useEffect(() => getVideoList(searchCriteria , setVideoList), [searchCriteria, refreshCount ])

   
    return (
      <div>
      <div>
        <Row>
          <UploadVideo callBackUpload={() =>  setRefreshCount(refreshCount+1) }/>
        </Row>
        </div>
        <div >
        <Row xs={2} md={4} lg={5} className="g-4 flex-wrap justify-content-center ps-4 pe-3">
          {videoList
            .map((video) => 
            <Video 
              key={video.id} 
              genre={video.genre} 
              link={video.link} 
              name={video.name} 
              language={video.language}
              id={video.id}
              callBackDelete={() => setRefreshCount(refreshCount+1)}
            />)}
        </Row>
      </div>
      </div>
    );

 
}
export default VideoList;

