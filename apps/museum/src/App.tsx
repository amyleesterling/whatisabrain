import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Meet from "./pages/Meet";
import MeetDetail from "./pages/MeetDetail";
import Explore from "./pages/Explore";
import Activity from "./pages/Activity";
import Brain from "./pages/Brain";
import Brain2 from "./pages/Brain2";
import Kindergarten from "./pages/Kindergarten";
import Wonder from "./pages/Wonder";
import ScaleTest from "./pages/ScaleTest";
import FlyStats from "./pages/FlyStats";
import ScaleWall from "./pages/ScaleWall";
import Citations from "./pages/Citations";
import WallLaunch from "./pages/WallLaunch";
import NavBar from "./components/NavBar";

// Vite's BASE_URL is "/" in dev and "/inner_cosmos/" in production. React
// Router wants the basename WITHOUT a trailing slash, so strip it.
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/meet" element={<Meet />} />
        <Route path="/meet/:id" element={<MeetDetail />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:stage" element={<Explore />} />
        {/* Non-interactive attract loop for a wall display (e.g. 3628×1600).
            Same guided-zoom experience, auto-advancing + looping, no chrome. */}
        <Route path="/attract" element={<Explore attract />} />
        {/* Wall launcher: click-to-fullscreen wrapper around the attract loop. */}
        <Route path="/wall" element={<WallLaunch />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/brain" element={<Brain />} />
        <Route path="/brain/2" element={<Brain2 />} />
        <Route path="/kindergarten" element={<Kindergarten />} />
        <Route path="/kindergarten/:stage" element={<Kindergarten />} />
        <Route path="/wonder" element={<Wonder />} />
        {/* "By the numbers" — brain stats. /scale-test kept as a legacy alias. */}
        <Route path="/stats" element={<ScaleTest />} />
        <Route path="/scale-test" element={<ScaleTest />} />
        {/* Fly brain: the FlyWire whole-brain connectome, as a companion to
            the human "by the numbers" page. */}
        <Route path="/fly" element={<FlyStats />} />
        {/* Simplified stats as they'd sit inside the wall's card 5. */}
        <Route path="/scale-wall" element={<ScaleWall />} />
        {/* Sources, calculations & credits (esp. the wiring estimate). */}
        <Route path="/citations" element={<Citations />} />
      </Routes>
    </BrowserRouter>
  );
}
