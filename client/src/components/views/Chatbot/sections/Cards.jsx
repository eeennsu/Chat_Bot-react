import React, { useCallback, useMemo } from 'react';
import { Avatar, Card, List } from 'antd';
import { memo } from 'react';
import CardSection from './CardSection';
import { RobotOutlined, SmileOutlined } from '@ant-design/icons';

const { Item } = List;

const Cards = memo(({ avatarSrc, who, card }) => {

    const avater = useMemo(() => {
        return who === 'bot' ? <RobotOutlined /> : <SmileOutlined />
    }, []);

    const renderCard = useCallback((cards) => {
        cards.map((v, i) => {
            <CardSection key={i} cardInfo={v.structValue}/>
        })
    }, []);

    return (
        <Item style={{ padding: '1rem' }}>
            <Item.Meta avatar={<Avatar icon={avater}/>} title={who} description={renderCard(card)}/>
        </Item>
    );
});

export default Cards;