import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PinTable from "../../components/PinTable";
import { getPinsByTopic } from "../../services/pinService";
import { clearTopicTags } from "../../actions/topic";
import PinByTopicHeader from "../../components/PinByTopicHeader";

function PinByTopic() {
    const selectedTopics = useSelector((state) => state.TopicReducer);
    const navigate = useNavigate();
    const [pinObject, setPinObject] = useState({ pins: [], total_pages: 0 });
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();


    useEffect(() => {
        if (selectedTopics.length === 0) {
            navigate("/");
        }
        return () => {
            dispatch(clearTopicTags());
        };
    }, []);



    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getPinsByTopic({ selectedTopics, page: page, limit: 15 });
            if (result.message === "get-pins-by-topic-success") {
                const newPins = [...new Map([...pinObject.pins, ...result.pins].map(pin => [pin.id, pin])).values()];
                setPinObject({
                    pins: newPins,
                    total_pages: result.total_pages
                });
            }
        };
        waittingAPI();
    },[selectedTopics.length, page]);


    return (
        <>
            <PinByTopicHeader selectedTopics={selectedTopics} />
            <PinTable pinObject={pinObject} setPage={setPage} page={page} />
        </>
    );
}

export default PinByTopic;