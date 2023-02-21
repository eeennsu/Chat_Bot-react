import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../../styled/Container'
import { logoutUser } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
	const dispatch = useDispatch();
	const navigator = useNavigate();

    useEffect(() => {
        axios.get('/api/hello');
    }, []);   
	
    const onClickHandler = useCallback(() => {
      // 바디가 필요없도록 구현해놓았다
        dispatch(logoutUser())
		 .then(res => {		
			console.log(res);
			if(res.payload.logoutSuccess){
				alert('로그아웃에 성공하였습니다.');
				navigator('/loginPage');
			} else {
				alert('로그아웃에 실패하였습니다.');
			}
		 });
    }, []);      // 바디가 필요없도록 구현해놓았다

    return (
        <Container>
          <h2>시작페이지</h2>
          <br />
          <button onClick={onClickHandler}>
            로그아웃
          </button>
        </Container>
    );
}

export default LandingPage;