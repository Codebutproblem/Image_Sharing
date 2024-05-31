import HomeButton from "./HomeButton";
import SearchForm from "./SearchForm";
import AddButton from "./AddButton";
import BellButton from "./BellButton";
import DropButton from "./DropButton";
import TopicButton from "./TopicButton";

function Header() {
  return (
    <div className="max-w-7xl mx-auto h-20 flex items-center px-3 gap-2">
      <HomeButton />
      <TopicButton />
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
