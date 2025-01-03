import bgImg1 from "./../img/bgImg1.png";
import bgImg2 from "./../img/bgImg2.png";
import bgImg3 from "./../img/bgImg3.png";
import bgImg4 from "./../img/bgImg4.png";
import bgImg5 from "./../img/bgImg5.png";
import bgImg6 from "./../img/bgImg6.png";
import bgImg7 from "./../img/bgImg7.png";
import bgImg8 from "./../img/bgImg8.png";

export function getBackgroundImage(bgImgId) {
  switch (bgImgId) {
    case 1:
      return bgImg1;
    case 2:
      return bgImg2;
    case 3:
      return bgImg3;
    case 4:
      return bgImg4;
    case 5:
      return bgImg5;
    case 6:
      return bgImg6;
    case 7:
      return bgImg7;
    case 8:
      return bgImg8;
    default:
      return null;
  }
}
