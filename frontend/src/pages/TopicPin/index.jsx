import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopicPinHeader from "../../components/TopicPinHeader";
import { useDispatch, useSelector } from "react-redux";
import { clearTopicIds } from "../../actions/topic";
import PinTable from "../../components/PinTable";
import { getPinsByTopic } from "../../services/pinService";

function TopicPin() {
    const topicIds = useSelector((state) => state.TopicReducer);
    const navigate = useNavigate();
    const [pins, setPins] = useState([]);
    const dispatch = useDispatch();

    
    useEffect(() => {
        return () => {
            dispatch(clearTopicIds());
        };
    },[]);
    useEffect(() => {
        if(topicIds.length === 0){
            navigate("/");
            return;
        }

        const waittingAPI = async () => {
            const result = await getPinsByTopic(topicIds);
            if (result.message === "get-pins-by-topic-success") {
                setPins(result.pins);
            }
        };
        waittingAPI();
    },[topicIds.length]);

    return (
        <>
            <TopicPinHeader topicIds={topicIds} />
            <PinTable pins={pins} />
        </>
    );
}

export default TopicPin;