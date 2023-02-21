import React, { memo } from 'react';
import { Card } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';


const CardSection = memo(({ cardInfo }) => {
    return (
        <Card style={{ width: 300 }} cover={
            <img src={cardInfo.fields.image.stringValue} alt={cardInfo.fields.description.stringValue}/>} 
            actions={[
                <a target='_blank' rel={'nopper noreferrer'} href={cardInfo.fields.link.stringValue}>
                    <EllipsisOutlined key='ellipsis'/>
                </a>
        ]}>
            <Card.Meta title={cardInfo.fields.description.stringValue} description={cardInfo.fields.stack.stringValue}>

            </Card.Meta>
        </Card>      
    );
});

export default CardSection;