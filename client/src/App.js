import "./App.css";
import VideoList from "./bricks/VideoList";
import NavbarMenu from "./bricks/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";



function App() {
  const [searchCriteria, setSearchCriteria] = useState("")
  return (
    
    <div className="App">
      <NavbarMenu onSearch={setSearchCriteria}/>
      <VideoList searchCriteria={searchCriteria}/>
    </div>
  );
}

export default App;