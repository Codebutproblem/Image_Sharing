import { getContrastingTextColor } from "../../utils/Color";
import { useDispatch } from "react-redux";
import { removeTopicTag } from "../../redux/actions/topic";

function PinByTopicHeader({ selectedTopics }) {


    const dispatch = useDispatch();

    const handleRemoveTopic = (e) => {
        const topicId = parseInt(e.target.getAttribute("topic-id"));
        dispatch(removeTopicTag(topicId));
    };

    return (
        <div className="flex flex-wrap gap-3 text-xl mb-5">
            {selectedTopics.map((topic) => {
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

export default PinByTopicHeader;