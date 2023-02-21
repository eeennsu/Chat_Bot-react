import React, { useCallback } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage, saveReply } from '../../../_actions/message_actions';
import ChatBox from './sections/ChatBox';
import Cards from './sections/Cards';

const Chatbot = () => {
    const dispatch = useDispatch();
    const message = useSelector(state => state.message.messages);

    const textQuery = useCallback(async (text) => {
        let conversations = [];
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        };

        dispatch(saveMessage(conversation));

        const textQueryVariables = {
            text: text
        };

        try {
            const response = await axios.post('/api/dialogflow/textQuery', textQueryVariables);
            // const content = response.data.fulfillmentMessages[0];
            
            for(let content of response.data.fulfillmentMessages){
                conversation = {
                    who: 'bot',
                    content: content
                };
                dispatch(saveMessage(conversation));    
            }            
        } catch (error) {
            // 오류 발생시 오류 메시지를 전달하기
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: 'Error.. please check the problem!',
                    }
                }
            };
            dispatch(saveMessage(conversation));    
        } finally {           
            console.log(conversation);
        }        
    }, []);

    const eventQuery = useCallback(async (event) => {
        let conversation = {  };
        const eventQueryVariables = {
            event
        };
     
        try {
            const response = await axios.post('/api/dialogflow/eventQuery', eventQueryVariables);
            const content = response.data.fulfillmentMessages[0];

            conversation = {
                who: 'bot',
                content: content
            };
            
        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: 'Error.. please call us 010-1234-5678'
                    }
                }
            }
        } finally{
            dispatch(saveMessage(conversation));
        }
    }, []);

    const keyPressHandler = useCallback((e) => {
        if(e.key === 'Enter'){
            if(!e.target.value){
                alert('you need to type somthing first');
                return; 
            }

            // 입력한 텍스트를 서버 쿼리 구문에 전송한다
            textQuery(e.target.value);

            e.target.vaule = '';
        }
    }, []);

    const renderMessages = useCallback((message) => {
        message?.map((message, i) => {
            if(message.content && message.content.text && message.content.text.text){
                return (<ChatBox key={i} who={message.who} text={message.content.text.text}/>);
            } else if (message.content && message.content.payload.fields.card){
                return (<Cards key={i} who={message.who} card={message.content.payload.fields.card}/>);
            }
        })
    }, []);

    // 최초 접속시 실행되는 이벤트 쿼리 ex) hello등
    useEffect(() => {
        eventQuery('welcomeToMyWebsite');
    }, []);

    return (
        <div style={{ height: 800, width: 700, border: '3px solid black', borderRadius: '1rem', margin: '0' }}>
            <div style={{ height: 742, width: '100%', overflow: 'auto' }}>
                { message && renderMessages(message) }
            </div>
            <div style={{ height: '45', borderTop: '2px solid grey' }}>
                <input type='text' onKeyPress={keyPressHandler} placeholder='Send a message...' 
                    style={{ width: '100%', height: '50px', padding: '0', 
                        border: 'none', outline: 'none', borderRadius: '1rem',
                        padding: '15px', fontSize: '15px' }}/>
            </div>
        </div>
    );
};

export default Chatbot;