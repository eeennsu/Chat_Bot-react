import React from 'react'             
import { Typography } from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import Chatbot from './components/views/Chatbot/Chatbot';

const { Title } = Typography;

const App = () => {

	return (	
		<div>
			<div style={{ display: 'flex', justifyContent: 'center', margin: '0', marginTop: '2rem' }}>
				<Title level={2}>CHAT BOT APP &nbsp;<RobotOutlined/></Title>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Chatbot />
			</div>		
		</div>			
	);
}

export default App;