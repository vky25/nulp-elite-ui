import { useParams } from "react-router-dom";

const Player = () => {
  const { contentId } = useParams();
  // Now contentId contains the value from the URL parameter
  return <div>Player will be intergrated Here</div>;
};

export default Player;
