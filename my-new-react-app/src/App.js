import "./App.css";
import useContentful from "./hooks/use-contentful";
import { Carousel } from "./components/carousel.jsx";

const query = `
{
  carouselCollection {
    items {
      title
      description
      image {
        url
        description
      }
    }
  }
}
`;

function App() {
  const { data, error, loading } = useContentful(query);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("Fetched data:", data); // Log the fetched data

  const carouselItems = data?.carouselCollection?.items || [];

  if (carouselItems.length === 0) {
    return <div>No data available</div>;
  }

  // Transform data for Carousel
  const carouselData = carouselItems.map((item) => ({
    src: item.image.url,
    alt: item.title,
  }));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Carousel Example</h1>
        <Carousel data={carouselData} />
      </header>
    </div>
  );
}

export default App;
