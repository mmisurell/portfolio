import React from "react";
import ImageGallery from "../components/ImageGallery";
import { EXHIBITION_IDS } from "../config";

const Exhibitions = () => {
  return (
    <div className="exhibitions-page">
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_ONE} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_TWO} />
      <ImageGallery exhibitionId={EXHIBITION_IDS.EXHIBITION_THREE} />
    </div>
  );
};

export default Exhibitions;
