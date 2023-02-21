import { Avatar, List } from 'antd';
import React, { useMemo } from 'react';
import { memo } from 'react';
import { RobotOutlined, SmileOutlined } from '@ant-design/icons';
const { Item } = List;


const ChatBox = memo(({ who, text }) => {

    const avatarSrc = useMemo(() => {
        return who === 'bot' ? <RobotOutlined /> : <SmileOutlined />
    }, []);

    return (
        <Item style={{ padding: '1rem', background: 'lightgrey', float }}>
            <Item.Meta avatar={<Avatar src={avatarSrc}/>} title={who} description={text} />            
        </Item>
    );
});

export default ChatBox;