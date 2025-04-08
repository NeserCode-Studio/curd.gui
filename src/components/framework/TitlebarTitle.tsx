import { TitleContext } from "@/App";
import { useContext } from "react";

export default function TitlebarTitle() {
  const { title } = useContext(TitleContext);
  return (
    <div className="title-bar-title">
      <span className="text">{title}</span>
    </div>
  );
}
