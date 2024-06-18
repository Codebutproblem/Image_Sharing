import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PinTable from "../../components/PinTable/PinTable";
import { getPinsByTopic } from "../../services/pinService";
import { clearTopicTags } from "../../redux/actions/topic";
import PinByTopicHeader from "../../components/PinByTopicHeader";
import SkeletonTable from "../../components/PinTable/SkeletonTable";
import ResponseMessage from "../../config/message";

function PinByTopic() {
  const selectedTopics = useSelector((state) => state.TopicReducer);
  const navigate = useNavigate();
  const [pinObject, setPinObject] = useState({ pins: [], total_pages: 0 });
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearTopicTags());
    };
  }, []);

  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getPinsByTopic({
        selectedTopics,
        page: page,
        limit: 16,
      });
      if (result.message === ResponseMessage.GET_SUCCESS) {
        const newPins = [
          ...new Map(
            [...pinObject.pins, ...result.pins].map((pin) => [pin.id, pin]),
          ).values(),
        ];
        setPinObject({
          pins: newPins,
          total_pages: result.total_pages,
        });
      }
    };
    waittingAPI();
  }, [page]);

  useEffect(() => {
    if (selectedTopics.length === 0) {
      navigate("/");
      return;
    }
    const waittingAPI = async () => {
      const result = await getPinsByTopic({
        selectedTopics,
        page: 1,
        limit: 16,
      });
      if (result.message === ResponseMessage.GET_SUCCESS) {
        setPinObject({
          pins: result.pins,
          total_pages: result.total_pages,
        });
      }
    };
    waittingAPI();
  }, [selectedTopics.length]);

  return (
    <>
      <PinByTopicHeader selectedTopics={selectedTopics} />
      {pinObject.pins.length === 0 ? (
        <SkeletonTable col={4} row={3} />
      ) : (
        <PinTable pinObject={pinObject} setPage={setPage} page={page} />
      )}
    </>
  );
}

export default PinByTopic;
