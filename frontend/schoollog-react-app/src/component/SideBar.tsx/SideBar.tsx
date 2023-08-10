import React, { useRef,useEffect } from 'react';
import './SideBar.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers'
import BorderLine from '../BorderLine/BorderLine';
import { ReactComponent as BookIcon } from '../../assets/side-bar-book.svg'
import { ReactComponent as SpeechIcon } from '../../assets/side-bar-speech.svg'
import { ReactComponent as StudentsIcon } from '../../assets/side-bar-students.svg'
import { ReactComponent as PaintingIcon } from '../../assets/side-bar-paint.svg'
import { Link } from 'react-router-dom';

function SideBar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  const isTeacher = useSelector((state:RootState) => state.isTeacher);

  const outside = useRef<any>();
  useEffect(() => {
    document.addEventListener('mousedown', handlerOutside);

    return () => {
      document.removeEventListener('mousedown', handlerOutside);
    };
  });
  
  const handlerOutside = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  return (
    <div className={isOpen ? 'Opened-bar':'Closed-bar'} ref={outside}>
      {!isTeacher && 
      <ul>
        <li>
          <BookIcon/>
          <a className='Menu-item-text'>스쿨로그 사용법</a>
        </li>
        <BorderLine width={'315px'} height={'1px'}/>
        <li>
          <PaintingIcon/>
          <a className='Menu-item-text'>그림 심리 테스트</a>
        </li>
        <BorderLine width={'315px'} height={'1px'}/>
        <li>
          <SpeechIcon/>
          <a className='Menu-item-text'>챗봇과 상담하기</a>
        </li>
        <BorderLine width={'315px'} height={'1px'}/>
        <li>
          <StudentsIcon/>
          <a className='Menu-item-text'>선생님과 상담하기</a>
        </li>
        <BorderLine width={'315px'} height={'1px'}/>
      </ul>
      }
      {isTeacher && 
      <ul>
        <li>
          <BookIcon/>
          <a className='Menu-item-text'>스쿨로그 사용법</a>
        </li>
        <BorderLine width={'315px'} height={'1px'}/>
        <li>
          <SpeechIcon/>
          <a className='Menu-item-text'>상담목록</a>
        </li>
        <BorderLine width={'315px'} height={'1px'}/>
        <Link style={{textDecorationLine: 'none', color: 'black'}} to='/studentList'>
        <li>
          <StudentsIcon/>
          <a className='Menu-item-text'>상담학생목록</a>
        </li>          
        </Link>

        <BorderLine width={'315px'} height={'1px'}/>
      </ul>
      }

      <BorderLine width={'2px'} height={'918px'}/> 
    </div>
  );
}

export default SideBar;
