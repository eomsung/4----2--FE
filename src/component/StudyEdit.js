import { useState, useEffect } from "react";
import { getStudyItem, patchStudyGroup } from "../api/studyService";
import { useNavigate, useParams } from "react-router-dom";
import "./StudyEdit.css";
import BackgroundOption from "./BackgroundOption";
import { saveRecentStudy } from "../utils/RecentStudy";
const StudyEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    nickname: "",
    studyname: "",
    description: "",
    img: "",
  });
  const [errors, setErrors] = useState({
    nickname: "",
    studyname: "",
    description: "",
    img: "",
  });

  useEffect(() => {
    const initialStudyItem = async () => {
      const studyItem = await getStudyItem(id);
      const { nickname, studyname, description, img } = studyItem || {};
      setFormData({ nickname, studyname, description, img });
    };

    initialStudyItem();
  }, [id]);

  const validateField = (name, value) => {
    switch (name) {
      case "nickname":
        if (!value) return "닉네임을 입력해주세요";
        return "";
      case "studyname":
        if (!value) return "스터디 이름을 입력해주세요";
        return "";
      case "description":
        if (!value) return "소개를 입력해주세요";
        return "";
      case "img":
        if (!value) return "배경을 선택해주세요";
        return "";
      default:
        return "";
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    try {
      // 모든 필드 검증
      Object.keys(formData).forEach((key) => {
        const errorMsg = validateField(key, formData[key]);
        if (errorMsg) {
          newErrors[key] = errorMsg;
        }
      });

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        await patchStudyGroup(id, formData); // 여기를 수정하면 됨
        const studyItem = await getStudyItem(id);
        const {
          nickname,
          studyname,
          description,
          point,
          createdAt,
          img,
          Emoticon,
        } = studyItem || {};
        const studyData = {
          id,
          nickname,
          studyname,
          description,
          point,
          createdAt,
          img,
          Emoticon,
        };
        saveRecentStudy(studyData);
        navigate(`/study/${id}`);
      }
    } catch (error) {
      console.log("Failed to patch study group:", error.message);
    }
  };

  return (
    <div className="StudyEdit">
      <h2 className="page-title">스터디 수정하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label for="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해 주세요"
            maxLength={12}
            className={errors.nickname ? "error-input" : ""}
          />
          {errors.nickname && (
            <div className="error-msg">*{errors.nickname}</div>
          )}
        </div>
        <div className="input-container">
          <label for="study-title">스터디 이름</label>
          <input
            id="study-title"
            type="text"
            name="studyname"
            value={formData.studyname}
            onChange={handleChange}
            placeholder="스터디 이름을 입력해주세요"
            className={errors.studyname ? "error-input" : ""}
          />
          {errors.studyname && (
            <div className="error-msg">*{errors.studyname}</div>
          )}
        </div>
        <div className="input-container">
          <label for="self-intro">소개</label>
          <textarea
            id="self-intro"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="소개 멘트를 작성해 주세요."
            className={errors.description ? "error-input" : ""}
          />
          {errors.description && (
            <div className="error-msg">*{errors.description}</div>
          )}
        </div>
        <div className="input-container">
          <label>배경 이미지를 선택해주세요</label>
          <fieldset className="background-option-container">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
              return (
                <BackgroundOption
                  key={index}
                  imgId={index}
                  onChange={handleChange}
                />
              );
            })}
          </fieldset>
          {errors.img && <div className="error-msg">*{errors.img}</div>}
        </div>
        <button type="submit" className="create-button">
          수정하기
        </button>
      </form>
    </div>
  );
};

export default StudyEdit;
