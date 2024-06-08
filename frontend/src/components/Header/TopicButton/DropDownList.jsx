import { useEffect, useState } from "react";
import { getAllTopics } from "../../../services/topicService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTopicTag } from "../../../redux/actions/topic";
import { ResponseMessage } from "../../../config/system";

function DropDownList({ id, setShowTopics }) {
	const navigate = useNavigate();
	const [topics, setTopics] = useState({
		all: [],
		remaind: []
	});
	const dispatch = useDispatch();
	const selectedTopics = useSelector((state) => state.TopicReducer);

	useEffect(() => {
		const fetchApi = async () => {
			const result = await getAllTopics("name-ASC");
			if (result.message === ResponseMessage.GET_ALL_TOPICS_SUCCESS) {
				result.topics.unshift({ id: 0, name: "Tất cả", slug: "all" });
				const remaind = result.topics.filter((topic) => {
					return !selectedTopics.find((ts) => ts.id === topic.id);
				});
				setTopics({ 
					all: result.topics,
					remaind: remaind
				});
			}
		};
		fetchApi();
	}, []);

	
	useEffect(() => {
		const remaindTopics = topics.all.filter((topic) => {
			return !selectedTopics.find((ts) => ts.id === topic.id);
		});
		setTopics({
			all: topics.all,
			remaind: remaindTopics
		});
	}, [selectedTopics.length]);


	const handleButtonClick = (e) => {
		const topicId = parseInt(e.target.getAttribute("topic-id"));
		if(topicId === 0){
			setShowTopics(false);
			navigate("/");
			return;
		}
		if(selectedTopics.length === 0){
			navigate(`/topic`);
		}
		const selectedTopic = topics.all.find((topic) => topic.id === topicId);
		dispatch(addTopicTag(selectedTopic));

	}

	const displayTopics = topics.remaind.map((topic) => {
		return (
			<li key={topic.id} className="list-none">
				<div
					topic-id={topic.id}
					onClick={handleButtonClick}
					className="block p-2 font-semibold hover:bg-neutral-200 rounded-xl cursor-pointer"
				>
					{topic.name}
				</div>
			</li>
		);
	});

	return (
		<div
			id={id}
			className="absolute top-full left-0 shadow-lg rounded-2xl bg-slate-50 p-1"
		>
			<ul className="overflow-auto h-80 w-52 max-w-40 p-1">
				{displayTopics}
			</ul>
		</div>
	)
}

export default DropDownList;