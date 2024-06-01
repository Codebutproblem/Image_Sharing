import { useEffect, useState } from "react";
import { getTopicsSelected } from "../../services/topicService";
import { getContrastingTextColor } from "../../utils/Color";
import { useDispatch } from "react-redux";
import { removeTopicId } from "../../actions/topic";

function TopicPinHeader({ topicIds }) {
    const [topics, setTopics] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getTopicsSelected(topicIds);
            if (result.message === "get-topics-success") {
                setTopics(result.topics);
            }
        };
        waittingAPI();
    }, [topicIds.length]);

    const handleRemoveTopic = (e) => {
        const topicId = parseInt(e.target.getAttribute("topic-id"));
        dispatch(removeTopicId(topicId));
    };

    return (
        <div className="flex flex-wrap gap-3 text-xl mb-5">
            {topics.map((topic) => {
                return (
                    <div
                        key={topic.id}
                        topic-id={topic.id}
                        onClick={handleRemoveTopic}
                        style={{
                            backgroundColor: `${topic.hexa_color}`,
                            color: getContrastingTextColor(topic.hexa_color)
                        }}
                        className="p-2 rounded-xl cursor-pointer">
                        {topic.name}
                    </div>
                );
            })}
        </div>
    );
}

export default TopicPinHeader;