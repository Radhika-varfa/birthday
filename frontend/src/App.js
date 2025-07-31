import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MemoryProvider } from "./context/MemoryContext";
import { GalleryProvider } from "./context/GalleryContext"; // Import the provider
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";
import GalleryPage from "./pages/GalleryPage";
import LoveStoryPage from "./pages/LoveStoryPage";
import MemoryBookPage from "./pages/MemoryBookPage";
import MapPage from "./pages/MapPage";
import Header from "./components/Header/Header";
import MemoryDetailPage from "./pages/MemoryDetailpage";
import EventDetailPage from "./pages/EventDetailPage";
import CakeWithCandles from "./components/Cake/CakeWithCandles";

function App() {
  return (
    <MemoryProvider>
      <GalleryProvider>
        {" "}
        {/* 👈 Wrap with GalleryProvider */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/cake" element={<CakeWithCandles />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/event/:id" element={<EventDetailPage />} />
            <Route path="/gallery/:memoryId" element={<MemoryDetailPage />} />
            <Route path="/love-story" element={<LoveStoryPage />} />
            <Route path="/memory-book" element={<MemoryBookPage />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </Router>
      </GalleryProvider>
    </MemoryProvider>
  );
}

export default App;
