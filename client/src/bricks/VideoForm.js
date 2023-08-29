import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getGenre, getLanguage } from "../API/fetchVideo";

/* export const genres = [
  "Action",
  "Business",
  "Funny videos",
  "Cooking",
  "Drama",
  "Fantasy",
  "Horror",
  "Learning",
  "Lecture",
  "Programming",
  "Romance",
  "Thriller",
  "Tech",
  "Other"
]; */

export const defaultFormState = {
  name: "",
  genre: "",
  link: "",
  language: ""
}

/* function newVideo(formState, successF, errorF) {
  fetch("/api/videos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formState }),
  }).then((res) => (res.ok ? successF() : errorF(res)));
}

function getGenre(successF, errorF) {
  fetch("/api/genre", {
    method: "GET"
  }).then((res) => (res.ok ? res.json().then(successF) : errorF(res)));
}

function getLanguage(successF, errorF) {
  fetch("/api/language", {
    method: "GET"
  }).then((res) => (res.ok ? res.json().then(successF) : errorF(res)));
} */


function VideoForm({ callBackUpload, formData, setVisible }) {

  const [formState, setFormState] = useState(formData);
  const setOnChange = (e) => {
    let newState = { ...formState }
    const propertyName = e.target.name
    newState[propertyName] = e.target.value
    // console.log(formState, newState, propertyName, e.target.value);
    setFormState(newState)
  }

  const [cbValues, setCBvalues] = useState({ genre: [], language: [] })
  console.log('cbValues', cbValues);

  function onLoadCB(property, getFun) {
    getFun((data) => {
      setFormState((st) => ({ ...st, [property]: data[0].id }))
      setCBvalues((st) => ({ ...st, [property]: data }))
    }, console.log)
  }

  useEffect(() => {
    onLoadCB("genre", getGenre)
    onLoadCB("language", getLanguage)
  }, [])

  return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formState.name}
                  onChange={setOnChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Select
                  value={formState.genre}
                  name="genre"
                  onChange={setOnChange}
                >
                  {cbValues.genre.map((genre, index) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.genre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLink">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Link"
                  name="link"
                  value={formState.link}
                  onChange={setOnChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLanguage">
                <Form.Label>Language</Form.Label>
                <Form.Select
                  name="language"
                  value={formState.language}
                  onChange={setOnChange}
                >
                  {cbValues.language.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.language}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button
                variant="primary"
                type="button"
                disabled={
                  formState.name === "" ||
                  formState.genre === "" ||
                  formState.link === "" ||
                  formState.language === ""
                }
                onClick={() => {
                  callBackUpload(formState, setVisible);
                  
                  /* newVideo(
                    formState,
                    // succesF, when sending to server is success, client is calling the function which is calling all the setters
                    () => {
                      setFormState(defaultFormState)
                      window.location.reload(true);
                    },
                    // errorF
                    (res) => {
                      console.error(res);
                    }
                  ); */

                }}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
}

export default VideoForm;
