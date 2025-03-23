import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import "./carousel.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const SPACE_ID = process.env.REACT_APP_SPACE_ID;
const ACCESS_TOKEN = process.env.REACT_APP_CDA_TOKEN;
const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

const fetchExhibition = async (id) => {
  const query = `
    query {
      exhibition(id: "${id}") {
        title
        subtitle
        dates
        artists
        exhibitionText {
          json
        }
        videoLink
        multipleFilesCollection {
          items {
            title
            description
            contentType
            fileName
            url
          }
        }
      }
    }`;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const { data } = await response.json();
  return data.exhibition;
};

const ImageGallery = ({ exhibitionId }) => {
  const [exhibition, setExhibition] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExhibition(exhibitionId);
        setExhibition(data);
      } catch (error) {
        console.error("Error fetching exhibition:", error);
      }
    };

    fetchData();
  }, [exhibitionId]);

  useEffect(() => {
    const links = document.querySelectorAll(".rich-text-content a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }, [exhibition]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newNextIndex = (currentIndex + 1) % totalItems;
    setNextIndex(newNextIndex);
    setTimeout(() => {
      setCurrentIndex(newNextIndex);
      setIsTransitioning(false);
    }, 200);
  };

  const handleBack = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newNextIndex = (currentIndex - 1 + totalItems) % totalItems;
    setNextIndex(newNextIndex);
    setTimeout(() => {
      setCurrentIndex(newNextIndex);
      setIsTransitioning(false);
    }, 200);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handleBack,
    swipeDuration: 500,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (!exhibition) {
    return <div></div>;
  }

  const {
    title,
    subtitle,
    artists,
    dates,
    exhibitionText,
    videoLink,
    multipleFilesCollection,
  } = exhibition;
  const images = multipleFilesCollection.items || [];

  const hasVideo = videoLink && videoLink.trim() !== "";
  const imageCount = images.length;
  const totalItems = hasVideo ? imageCount + 1 : imageCount;

  const currentItem =
    currentIndex === imageCount && hasVideo
      ? { url: videoLink, description: "Video" }
      : images[currentIndex] || { url: "", description: "No media available" };

  const nextItem =
    nextIndex === imageCount && hasVideo
      ? { url: videoLink, description: "Video" }
      : images[nextIndex] || { url: "", description: "No media available" };

  const isImage = (item) =>
    item.url &&
    !item.url.includes("youtube.com") &&
    !item.url.includes("vimeo.com");
  const isVideo = (item) =>
    item.url &&
    (item.url.includes("youtube.com") || item.url.includes("vimeo.com"));

  const RICHTEXT_OPTIONS = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p>{children}</p>;
      },
    },
  };

  return (
    <div className="page">
      <div className="exhibition">
        <div className="gallery-wrapper" {...handlers}>
          <div className="nav-frame-left" onClick={handleBack}>
            {"<"}
          </div>
          <div className="image-gallery-content">
            <div
              className={`gallery-item ${
                isTransitioning ? "fade-out" : "fade-in"
              }`}
            >
              {isImage(currentItem) ? (
                <img
                  src={currentItem.url}
                  alt={currentItem.description || "No description available"}
                  className="gallery-image"
                />
              ) : isVideo(currentItem) ? (
                <iframe
                  src={currentItem.url}
                  title={currentItem.description}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                ></iframe>
              ) : (
                <div>No media available</div>
              )}
            </div>
            <div
              className={`gallery-item ${
                isTransitioning ? "fade-in" : "fade-out"
              }`}
            >
              {isImage(nextItem) ? (
                <img
                  src={nextItem.url}
                  alt={nextItem.description || "No description available"}
                  className="gallery-image"
                />
              ) : isVideo(nextItem) ? (
                <iframe
                  src={nextItem.url}
                  title={nextItem.description}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                ></iframe>
              ) : (
                <div>No media available</div>
              )}
            </div>
          </div>
          <div className="nav-frame-right" onClick={handleNext}>
            {">"}
          </div>
        </div>

        <div className="counter-wrapper-mobile">
          <div className="nav-left-mobile" onClick={handleBack}>
            {"<"}
          </div>
          <div className="counter">
            {currentIndex + 1} of {totalItems}
          </div>
          <div className="nav-right-mobile" onClick={handleNext}>
            {">"}
          </div>
        </div>

        <div className="exhibition-description">
          <p>{currentItem.title || "Untitled"}</p>
          <p>{currentItem.description || ""}</p>
        </div>
      </div>
      <section className="side-bar">
        <div className="exhibition-artists">
          <div className="exhibition-title">
            <p>{title}</p>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <p>
            {windowWidth > 768
              ? artists.split(",").map((artist, index) => (
                  <React.Fragment key={index}>
                    {artist.trim()}
                    <br />
                  </React.Fragment>
                ))
              : artists}
          </p>
          {exhibitionText?.json && (
            <div className="rich-text-content">
              {documentToReactComponents(exhibitionText.json, RICHTEXT_OPTIONS)}
            </div>
          )}
        </div>
        <div className="exhibition-dates">
          <p>
            On View
            <br />
            {dates}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ImageGallery;
