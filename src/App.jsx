import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";
// AuthProvider artık AppRoutes.jsx dosyasında kullanılıyor

function App() {
  return <RouterProvider router={router} />;
}

export default App;
