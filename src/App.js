/* eslint-disable */

import { useState } from 'react';
import './App.css';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])
  let 글제목copy = [...글제목]
  let [따봉, 따봉변경] = useState([0, 0, 0])
  let 따봉copy = [...따봉]
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false, timeZone: 'Asia/Seoul' };
  const [날짜, 날짜변경] = useState([new Date().toLocaleDateString('ko-KR', options), new Date().toLocaleDateString('ko-KR', options), new Date().toLocaleDateString('ko-KR', options)])
  let 날짜copy = [...날짜]
  const [modal, setModal] = useState(false)
  const [modalIndex, setmodalIndex] = useState(0)
  const [입력값, 입력값변경] = useState('')

  function enterKeyEvent(event) {
    if (event.key === 'Enter') {
      글발행()
      document.getElementById('value').value = ''
    }
  }

  function 글발행()  {
    if (입력값.trim() == '') return
    
    글제목copy.unshift(입력값)
    따봉.unshift(0)
    날짜.unshift(new Date().toLocaleDateString('ko-KR', options))
    글제목변경(글제목copy)
    입력값변경('')
  }
  
  return (
    <div className='App'>
      <div className='black-nav'>
        <h4>React Blog</h4>
      </div>
      {
        글제목.map(function(a, i) {
          return (
          <div className='list' key={i}>
            <h4> 
              <span onClick={() => { setModal(!modal); setmodalIndex(i); }}> { a } </span> <span onClick={() => { 따봉copy[i] += 1; 따봉변경( 따봉copy); }} >👍</span> 
              { 따봉[i] }&nbsp;&nbsp;
              <button onClick={() => { 글제목copy.splice(i, 1); 따봉.splice(i, 1); 글제목변경(글제목copy); }}>글삭제</button>
            </h4>
            <p>{날짜[i]} 발행</p>
          </div>
          )
        })
      }

      <input 
        id="value" 
        onChange={(e) => { 입력값변경(e.target.value)}} 
        onKeyDown={ enterKeyEvent } 
      />
      <button 
        onClick={ 글발행 }
      >글발행</button>

      {
        modal ? 
        <Modal 
          글제목={글제목copy} 
          날짜={ 날짜copy }
          글수정={() => { 글제목copy[0] = '여자코트 추천'; 글제목변경( 글제목copy);}}
          index={modalIndex}
        /> 
        : null
      }


    </div>
  );
}

function Modal(props) {
  return (
    <div className='modal'>
      <h4>제목 : {props.글제목[props.index]}</h4>
      <p>날짜 : {props.날짜[props.index]}</p>
      <p>상세내용</p>
      <button onClick={ props.글수정 }>글수정</button>
    </div>
  )
}

/**
 * jsx 문법
 * style을 줄 때 class 대신 className
 * 변수 넣을 땐(데이터바인딩) 중괄호 : document.querySelector('h4').innerHTML = post => { post }
 * style 넣을 땐 중괄호 style={ {color:red} }
 * return () 안에는 병렬로 태그 2개 이상 기입금지 (한 개만 가능)
 */

/** state 문법
 * 1. import { useState }
 * 2. useState(보관할 자료)
 * 3. let [작명1, 작명2] : 작명1은 useState에 인수, 작명 2는 state 변경에 쓰이는 함수
 * 
 * 변수가 있는데 state를 쓰는 이유
 * 일반 변수는 갑자기 변경되면 html에 자동으로 반영이 안되지만 state는 re-rendering을 통해 반영이 됨 => 변동시 자동으로 html에 반영되게 하기 위해
 * 변화가 잦은 내용에 대해서만 state 사용
 * 변경시 이전 state와 신규 state를 ==로 비교해서 변경이 되었다면 리렌더링
 */

/** 컴포넌트 만드는 법
 * 1. function 생성
 * 2. return() 안에 html 담기
 * 3. <함수명></함수명> 쓰기
 */

/** 어떤 경우 컴포넌트를 만들면 좋은가
 * 1. 반복적인 html 축약할 때
 * 2. 큰 페이지들
 * 3. 자주 변경되는 것들
 */

/** 동적인 UI 만드는 STEP
 * 1. html css로 미리 디자인 완성
 * 2. UI의 현재 상태를 state로 저장
 * 3. state에 따라 UI가 어떻게 보일지 작성
 */

/** 비슷한 html 반복생성할 때는 map 함수 사용용 */

/** 부모 -> 자식 state 전송하는 법
 * 1. <자식컴포넌트 작명={state명} />
 * 2. props 파라미터 등록 후 "props.작명" 사용
 * 3. 부모 -> 자식만 되는 단방향 (같은 레벨의 컴포넌트끼리도 전송 불가능)
 */
export default App;
