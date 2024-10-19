import { useState } from "react";
import "./App.css";
import AppLayout from "./ui/AppLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppLayout>
      <div>Hello World</div>
    </AppLayout>
  );
}

export default App;
