import { useState } from "react";
import { createStudyGroup } from "../api/studyService";
import { useNavigate } from "react-router-dom";
import "./StudyCreate.css";

const IMG_5 =
  "https://s3-alpha-sig.figma.com/img/6b6c/6a7d/c4408f7b0937efea8c93acf4f0e18638?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k7O3ZtQ1mnNuNqVWOmYw87sWiUkzOow5IhqHlBY~c1mGyUXhDeAXMRZlNMBWOMylgWaTfNTi0EGObzh3~J-lzHeCspY0oJh-9SKeu44GDA29TKqO5c4xIM0uC0COXFNuu97qDYkEWSOgMT1mWe2oWxL9c5pqr~ddjgdnH5mLVOcAtyRcyG2BY~lsbDNzepVSWN97AC4pYPZmZiSvkH2OS~ca6oKIDAV9tcmTRvZ8ylyp5-PX1Dfw~LMUA06LKekV8Ug4ZumnhuvJtmkz8o3DIg1YMo3pAGL5rz0bDvsS5prDmG-DBSq20nvMX52KATLm0-TXKes7gDAMbiPQCqh5fg__";
const IMG_6 =
  "https://s3-alpha-sig.figma.com/img/dc6a/d41b/ddc9cf355eb8f2c27175163237119e73?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qkZOlBduyLlQUtQaHlxIgISzLAaTL-aoMbqUnR0-ZhgUyIKRwr3MC0kiTpNYPnvvqvrIFoGG2PuRIV0wvh~UgvtX3JVvtK5-szQVJ6vOzgmHDaqqkU2sKb8hhQXtkFrISHk7tysMYIv2UCRUq0bdUxCnwBFGKn6uWz1j7yvM0rg4oFKWV4McwAOwfl48Rxok0bBVD2p1SqzWZoeJBUx36axjX77tRW~nKlctG2lgEPLaAiVcyZ1lmQfgrz9-SnEBcSHw7s5lou5upIct-OC9FH8KSrHBXUj9UNxgQFnCuKqC6b994LOceIsmydsy9oRP-k2rnp9OChDhh4Ec-AGMGg__";
const IMG_7 =
  "https://s3-alpha-sig.figma.com/img/a690/8b7f/37380f9d6e605cf6a0e9955d50ea062d?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UiYt32GiwE2zN2v5uSrWBFsrUu7XbgvPCvVO3axuzBEboI7XyUAe6xyL9bSIZNiVrEqupSXFVSWp6U4QN-Fg3lJeTydXojsaew65L4gHB5TDVm11S9S64fasKhQeKAd~EqKS37R46nHzJgOAsK8lowWLMil-GG3NhVaQkf03ee77IJIUBopjNb3QqwqsdpCOcwlhIQHyPV2sOI9PwomAkec3Y7~d03MIfHume7O99bvNNYB2UkG0RKW4d8MNudyMYhEG~s6Gz957xUcjq-gyQqpOH7cQtGk-8tPjDI6uBDA-IGW-mOqSNFklcnSSS1CMq9xkaxHjbN-zSPHexq01Vw__";
const IMG_8 =
  "https://s3-alpha-sig.figma.com/img/c230/ffba/520fab60716f712257d7f6a7fc48a42f?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XFli85hrURDpsrq40rvBYy6vLRmkGcjcKpXmPjesLs0IoRpMraNo5hkLoW9A2iXt0E4uUpEvsEEMuFnKQO0x9rORzfSm~JM9mHfHnQ-XqhfN6YVtY11mr7zAeE4fTEnDFUeItPqUUrN3PuOqEPXclbw14UjHZu2B2mkn~ip6TkaaoWH0pixjHjAhg6AIbzOmfXMffAxdArzEZF-VhVS65qy6B-I47ptJ2ounGqaemvFkijv5zHbg8qpAEGz01NjtkgSaV57qG94mVT89ujdCoNLy0KGNTgp2avCsRwGOT~FZwCfRzUTGg3ILQo4rnSOiizS17AspPYWLk2lFxY4hUQ__";

function StudyCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    studyname: "",
    description: "",
    password: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createStudyGroup(formData);
      console.log("Study group created:", result);
      navigate(`/study/${result.id}`);
    } catch (error) {
      console.log("Failed to create study group:", error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">스터디 만들기</h2>
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
            required
          />
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
          />
        </div>
        <div className="input-container">
          <label for="self-intro">소개</label>
          <textarea
            id="self-intro"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="소개 멘트를 작성해 주세요."
          />
        </div>
        <div className="input-container">
          <label>배경 이미지를 선택해주세요</label>
          <fieldset>
            <label>
              <input
                type="radio"
                name="img"
                value={IMG_5}
                onChange={handleChange}
                checked={formData.img === IMG_5}
              />
              <img src={IMG_5} alt="배경 이미지 5" />
            </label>
            <label>
              <input
                type="radio"
                name="img"
                value={IMG_6}
                onChange={handleChange}
                checked={formData.img === IMG_6}
              />
              <img src={IMG_6} alt="배경 이미지 6" />
            </label>
            <label>
              <input
                type="radio"
                name="img"
                value={IMG_7}
                onChange={handleChange}
                checked={formData.img === IMG_7}
              />
              <img src={IMG_7} alt="배경 이미지 7" />
            </label>
            <label onChange={handleChange}>
              <input
                type="radio"
                name="img"
                value={IMG_8}
                onChange={handleChange}
                checked={formData.img === IMG_8}
              />
              <img src={IMG_8} alt="배경 이미지 8" />
            </label>
          </fieldset>
        </div>
        <div className="input-container">
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>
        <div className="input-container">
          <label for="password-confirm">비밀번호 확인</label>
          <input
            type="password"
            id="password-confirm"
            placeholder="비밀번호를 다시 한번 입력해 주세요"
          />
        </div>
        <button type="submit" className="create-button">
          만들기
        </button>
      </form>
    </div>
  );
}

export default StudyCreate;
