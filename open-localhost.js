import open from "open";

open("http://localhost:8080").catch((err) => {
  console.error("Failed to open browser:", err);
});
