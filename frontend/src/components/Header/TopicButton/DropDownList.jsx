import { useEffect, useState } from "react";
import { getAllTopics } from "../../../services/topicService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTopicId, clearTopicIds } from "../../../actions/topic";

function DropDownList({ id, setShowTopics }) {
	const navigate = useNavigate();
	const [topics, setTopics] = useState({
		all: [],
		remain: []
	});
	const dispatch = useDispatch();
	const topicIds = useSelector((state) => state.TopicReducer);

	useEffect(() => {
		const fetchApi = async () => {
			const result = await getAllTopics("name-ASC");
			if (result.message === "get-all-topics-success") {
				result.topics.unshift({ id: 0, name: "Tất cả", slug: "all" });
				setTopics({ all: result.topics, remain: result.topics});
			}
		};
		fetchApi();
	}, []);

	
	useEffect(() => {
		const remainTopics = topics.all.filter((topic) => {
			return !topicIds.find((topicId) => topicId === topic.id);
		});
		setTopics({
			all: topics.all,
			remain: remainTopics
		});
	}, [topicIds.length]);


	const handleButtonClick = (e) => {
		const topicId = e.target.getAttribute("topic-id");
		if(parseInt(topicId) === 0){
			setShowTopics(false);
			navigate("/");
		}
		if(topicIds.length === 0){
			navigate(`/topic`);
		}
		dispatch(addTopicId(parseInt(topicId)));

	}

	const displayTopics = topics.remain.map((topic) => {
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