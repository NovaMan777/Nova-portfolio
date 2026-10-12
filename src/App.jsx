import { useCallback, useState } from "react";
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

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem("boot-complete", "1");
    setBootComplete(true);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <Toaster />
      {!bootComplete ? (
        <LoadingScreen onComplete={handleBootComplete} />
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
