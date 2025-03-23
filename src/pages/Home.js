// src/pages/Home.js
import React from "react";
import ImageGallery from "../components/ImageGallery";
import { EXHIBITION_IDS } from "../config";

const Home = () => {
  console.log(EXHIBITION_IDS);
  return (
    <div className="exhibitions-page">
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_38} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_36} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_35} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_OS} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_34} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_33} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_32} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_31} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_30} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_29} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_28} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_27} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_26} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_25} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_24} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_23} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_22} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_21} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_20} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_OS18} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_19} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_18} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_17} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_16} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_15} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_OS17} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_14} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_13} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_12} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_11} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_10} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_09} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_08} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_07} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_06} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_05} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_04} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_03} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_02} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_01} />
    </div>
  );
};
export default Home;
