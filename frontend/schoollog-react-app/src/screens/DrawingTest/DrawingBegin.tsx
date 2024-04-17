import React from 'react';
import { ReactComponent as Drawing1 } from '../../assets/drawing-begin.svg';
import { Link } from 'react-router-dom';

function DrawingBegin() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Drawing1 />
      <Link to="/test">
        <button
          style={{
            width: '340px',
            height: '61px',
            border: 'none',
            borderRadius: '8px',
            background: 'var(--g, #35BA95)',
            color: 'var(--w, #FFF)',
            textAlign: 'center',
            fontFamily: 'Pretendard',
            fontSize: '18px',
            fontWeight: '700',
            marginTop: '63px',
            cursor: 'pointer',
          }}
        >
          시작하기
        </button>
      </Link>
    </div>
  );
}

export default DrawingBegin;
