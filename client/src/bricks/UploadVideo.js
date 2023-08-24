import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const genres = [
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
];

const defaultFormState = {
  name: "",
  selectedGenres: "",
  link: "",
  language: ""
}

function newVideo(formState, successF, errorF) {
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
}

function UploadVideo({ callBackUpload }) {
  const [hidden, setVisible] = useState(true);
  const [formState, setFormState] = useState(defaultFormState)
  const setOnChange = (e) => {
    let newState = {...formState}
    const propertyName = e.target.name
    newState[propertyName] = e.target.value
    // console.log(formState, newState, propertyName, e.target.value);
    setFormState(newState)
  }

  const [cbValues, setCBvalues] = useState({ genres: [], languages: []})
  console.log('cbValues',cbValues);
  useEffect(() => {
    getGenre((data) => setCBvalues((st) => ({...st, genres: data})), console.log);
    getLanguage((data) => setCBvalues((st) => ({...st, languages: data})), console.log);
  }, [])


  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Button variant="outline-success" onClick={() => setVisible(!hidden)}>
            {hidden ? "Upload" : "Cancel"}
          </Button>
          <Form hidden={hidden}>
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
                {cbValues.genres.map((genre, index) => (
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
                {cbValues.languages.map((lang) => (
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
                formState.selectedGenres === "" ||
                formState.link === "" ||
                formState.language === ""
              }
              onClick={() => {
                newVideo(
                  formState,
                  // succesF, when sending to server is success, client is calling the function which is calling all the setters
                  () => {
                    setFormState(defaultFormState)
                    callBackUpload();
                    window.location.reload(true);
                  },
                  // errorF
                  (res) => {
                    console.error(res);
                  }
                );
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

export default UploadVideo;
