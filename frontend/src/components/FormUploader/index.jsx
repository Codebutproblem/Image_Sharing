import DescInput from "./DescInput";
import OtherOption from "./OtherOption";
import TableSelect from "./TableSelect";
import TitleInput from "./TitleInput";
import TopicSelect from "./TopicSelect";

function FormUploader() {
  return (
    <div className="md:flex-grow md:w-auto w-full">
      <div className="mb-5">
        <TitleInput />
      </div>
      <div className="mb-5">
        <DescInput />
      </div>
      <div className="mb-5">
        <TableSelect />
      </div>
      <div className="mb-5">
        <TopicSelect />
      </div>
      <div className="mb-5">
        <OtherOption />
      </div>
    </div>
  );
}

export default FormUploader;
