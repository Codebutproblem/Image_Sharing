import HomeButton from "./HomeButton";
import SearchForm from "./SearchForm";
import AddButton from "./AddButton";
import BellButton from "./BellButton";
import DropButton from "./DropButton";
import TopicButton from "./TopicButton";
import { useEffect, useState } from "react";

function Header() {
  let initShow = true;
  if (window.innerWidth < 640) initShow = false;
  const [showText, setShowText] = useState(initShow);
  const handleResize = () => {
    if (window.innerWidth < 640) setShowText(false);
    else setShowText(true);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto h-20 flex items-center px-3 gap-2">
      <HomeButton showText={showText} />
      <TopicButton showText={showText} />
      <AddButton />
      <SearchForm />
      <div className="ml-auto flex items-center">
        <BellButton />
        <DropButton />
      </div>
    </div>
  );
}

export default Header;
