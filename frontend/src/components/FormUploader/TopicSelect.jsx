import { useEffect, useState } from "react";
import { getAllTopics } from "../../services/topicService";
import { useDispatch, useSelector } from "react-redux";
import { addTopic, removeTopic } from "../../actions/uploader";
import { getContrastingTextColor } from "../../utils/Color";
function TopicSelect() {
  const uploader = useSelector((state) => state.UploadReducer);
  const [topics, setTopics] = useState({
    all: [],
    remaind: [],
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllTopics("name-ASC");
      if (result.message === "get-all-topics-success") {
        setTopics({
          all: result.topics,
          remaind: result.topics,
        });
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const remaindTopics = topics.all.filter((topic) => {
      return !uploader.topics.find((t) => t.id === topic.id);
    });
    setTopics({
      all: topics.all,
      remaind: remaindTopics,
    });
  }, [uploader.topics.length]);

  const handleChangeSelect = (e) => {
    const selectedTopicId = e.target.value;
    if (selectedTopicId === "") return;
    const selectedTopic = topics.all.find(
      (topic) => topic.id.toString() === selectedTopicId,
    );
    dispatch(
      addTopic({
        id: parseInt(selectedTopicId),
        name: selectedTopic.name,
        hexa_color: selectedTopic.hexa_color,
      }),
    );
  };

  const handleRemove = (e) => {
    const topicId = e.target.getAttribute("topic-id");
    dispatch(removeTopic(parseInt(topicId)));
  };

  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Chủ đề
      </label>
      <select
        onChange={handleChangeSelect}
        className="min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
      >
        <option value="" aria-readonly>
          --- Chọn chủ đề ---
        </option>
        {topics.remaind.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        ))}
      </select>
      <div className="mt-2">
        {uploader.topics.map((topic) => {
          return (
            <span
              key={topic.id}
              topic-id={topic.id}
              onClick={handleRemove}
              style={{
                backgroundColor: topic.hexa_color,
                color: getContrastingTextColor(topic.hexa_color),
              }}
              className="inline-block mt-2 rounded-3xl px-3 py-1 text-sm font-semibold mr-2 cursor-pointer hover:bg-sky-800"
            >
              {topic.name}
            </span>
          );
        })}
      </div>
    </>
  );
}

export default TopicSelect;
