import { Popup } from "../items/Popup";
import "../styles/Popup.css";

export const Home = () => {

  return (
    <div id="homePage" className="page">
      <Popup id="test" title="Test" btnText="Hello">
        <input type="text"></input>
      </Popup>
    </div>
  );
};
