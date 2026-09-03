import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import LoadingScreen from "@/components/LoadingScreen";
import { Analytics } from "@vercel/analytics/react";
import "@/fonts";

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [seenBefore] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("boot-complete") === "1";
  });

  const handleBootComplete = () => {
    sessionStorage.setItem("boot-complete", "1");
    setBootComplete(true);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      {!bootComplete ? (
        <LoadingScreen
          onComplete={handleBootComplete}
          requireEnter={!seenBefore}
        />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Analytics />
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}

export default App;
