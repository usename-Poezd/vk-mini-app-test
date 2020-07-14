import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [token, setToken] = useState();
	const [friends, setFriends] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

		const getAccessToken = async () => {
			const token = await bridge.send("VKWebAppGetAuthToken", { "app_id": 7538950, "scope": "friends,status"});
			setToken(token.access_token);
			return token.access_token;
		};

		const fetchData = async (token) => {
			const friends = await bridge.send('VKWebAppCallAPIMethod', {
				method: "friends.get",
				request_id: "32test",
				params: {
					user_ids: "1",
					fields: "photo_200",
					v:"5.120",
					access_token: token
				}
			});
			setFriends(friends.response);
			setPopout(null);
		};
		getAccessToken()
			.then((token) => {
				fetchData(token);
			});
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' friends={friends} go={go} />
			<Persik id='persik' go={go} />
		</View>
	);
}

export default App;

