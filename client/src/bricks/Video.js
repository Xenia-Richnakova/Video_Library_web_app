import React, { useState } from "react";
import Card from "react-bootstrap/Card"; // import of Card component
import Icon from "@mdi/react"; // component we will use to display the icon
import {
  mdiBookOpenPageVariant,
  mdiVideoVintage,
  mdiYoutube,
  mdiTrashCanOutline,
  mdiTranslate,
} from "@mdi/js"; // icons we want to use
import Col from "react-bootstrap/Col";
import OkCancelModal from "./Modal";
import VideoForm from "./VideoForm";
import { editVideo, removeVideo } from "../API/fetchVideo";





function Video({ genre, name, language, link, id, callBackRefresh }) {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  let imagelink = "https://img.youtube.com/vi/";

  if (link.length > 30) {
    imagelink = "http://img.youtube.com/vi/" + link.substr(32) + "/0.jpg";
  }

  return (
    <Col className="p-3">
      <Card>
        <Card.Img
          variant="top"
          src={imagelink}
          style={{ height: "50%", objectFit: "cover" }}
        />
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Title>
            <Icon path={mdiVideoVintage} size={1.2} color="#7AE6FC" /> {name}
            <br />
            <Icon
              path={mdiBookOpenPageVariant}
              size={1.2}
              color="#7AE6FC"
            />{" "}
            {genre}
            <br />
            <Icon path={mdiTranslate} size={1} color="#7AE6FC" /> {language}
          </Card.Title>
          <Card.Text>
            <Icon path={mdiYoutube} size={1.2} color="red" />{" "}
            <a href={link} target="_blank" rel="noreferrer">
              Link to video
            </a>
          </Card.Text>
          <Card.Text className="text-end">
            <Icon path={mdiTrashCanOutline} size={1.1} color="yellow" onClick={() => setShowEdit(true)} />{" "}
            <Icon path={mdiTrashCanOutline} size={1.1} color="red" onClick={() => setShow(true)} />{" "}
          </Card.Text>
        </Card.Body>
      </Card>
      <OkCancelModal
        messageTitle="Delete"
        message="Are you sure to delete item"
        show={show}
        onOk={() =>
          removeVideo(
            id,
            // succesF
            () => {
              callBackRefresh();
            },
            // errorF
            (res) => console.error(res)
          )
        }
        onCancel={() => setShow(false)}
      />
      <OkCancelModal
        messageTitle="Edit Video"
        message={<VideoForm callBackUpload={
          (formData) => {
            editVideo({...formData, id}, () => { 
            callBackRefresh()
            setShowEdit(false)}, console.log)
          }
        } formData={{ genre, name, language, link }} />}
        show={showEdit}
        onCancel={() => setShowEdit(false)}
      />
    </Col>
  );
}

export default Video;
