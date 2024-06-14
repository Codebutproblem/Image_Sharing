import Comment from "../../components/Comment";
import PinDetailPart from "../../components/PinDetailPart";
import RecommendPart from "../../components/RecommendPart";

function PinDetail() {
  return (
    <div className="flex flex-col gap-10 md:flex-row justify-between py-5 px-5 xl:px-0">
      <div className="w-full md:w-[60%] min-w-[250px] md:min-w-[400px]">
        <PinDetailPart />
        <Comment />
      </div>
      <div className=" w-full md:w-[35%] lg:w-[30%]">
        <RecommendPart limit={7} />
      </div>
    </div>
  );
}

export default PinDetail;
