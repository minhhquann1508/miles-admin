import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import MainLayout from "./components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            if (route.isWrapLayout) {
              return <Route path={route.path} key={index} element={<MainLayout><route.element /></MainLayout>} />
            } else {
              return <Route path={route.path} key={index} element={<route.element />} />
            }
          })}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App
