import { getContrastingTextColor } from "../../utils/Color";
import { useDispatch } from "react-redux";
import { addTopicTag } from "../../redux/actions/topic";
import { useNavigate } from "react-router-dom";
function TopicList({topics}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleTopicClick = (e) => {
        const topicId = parseInt(e.target.getAttribute("topic_id"));
        const topic = topics.find((topic) => topic.id === topicId);
        dispatch(addTopicTag(topic));
        navigate("/topic");
    };
    return (
        <div className="flex flex-wrap gap-3">
            {topics?.map((topic) => (
                <span
                    onClick={handleTopicClick}
                    style={{
                        backgroundColor: `${topic.hexa_color}`,
                        color: getContrastingTextColor(topic.hexa_color),
                    }}
                    key={topic.id}
                    topic_id={topic.id}
                    className="p-2 rounded-xl cursor-pointer font-medium"
                >
                    {topic.name}
                </span>
            ))}
        </div>
    )
}

export default TopicList;