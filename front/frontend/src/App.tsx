import "./App.css";
import { useState } from "react";
import type { ScanAPIResponse } from "../type/bookmark.type";

function App() {
  const [data, setData] = useState<ScanAPIResponse | null>(null);

  const scan = () => {
    const URL = "http://localhost:3000/file";

    const requestOptions = {
      method: "GET",
    };

    fetch(URL, requestOptions).then((res) => {
      if (!res.ok) {
        console.error("response.ok:", res.ok);
        console.error("response.status:", res.status);
        console.error("response.statusText:", res.statusText);
      } else {
        res.json().then((data) => setData(data));
      }
    });
  };

  console.log(data?.bookmark_bar);

  return (
    <div className="App">
      <button onClick={scan}>スキャン</button>

      {data != null ? (
        <div>
          <p>taipu</p>
        </div>
      ) : (
        <div>No Data.</div>
      )}
    </div>
  );
}

export default App;
