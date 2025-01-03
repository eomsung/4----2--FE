import { getBackgroundImage } from "../utils/get-background-img";
import "./BackgroundOption.css";

const BackgroundOption = ({ imgId, onChange }) => {
  return (
    <label className="BackgroundOption">
      <input
        type="radio"
        name="img"
        value={imgId}
        onChange={onChange}
        // checked={formData.img === getBackgroundImage(imgId)}
      />
      <img src={getBackgroundImage(imgId)} alt={`배경 이미지 ${imgId}`} />
    </label>
  );
};

export default BackgroundOption;
