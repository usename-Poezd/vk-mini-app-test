import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Link from '@vkontakte/vkui/dist/components/Link/Link';

const Home = ({ id, go, friends }) => (
	<Panel id={id}>
		<PanelHeader>Тестовая</PanelHeader>
		{
			friends && friends.items.length > 0 &&
			<Group title="User Data Fetched with VK Bridge">
				{
					friends.items.map( (item, idx) => (
						<Cell
							key={item.id}
							before={item.photo_200 ? <Avatar src={item.photo_200}/> : null}
							description={item.city && item.city.title ? item.city.title : ''}
						>
							<Link target="_blank" href={`https://vk.com/id${item.id}`}>{`${item.first_name} ${item.last_name}`}</Link>
						</Cell>
					))
				}
			</Group>
		}
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Home;
