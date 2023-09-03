import React, { useState, useEffect } from "react";
import axios from "axios";
import './SchoolSearchModal.css'
import BorderLine from "../../component/BorderLine/BorderLine";
import { ReactComponent as SearchIcon } from "../../assets/signup-input-search.svg";
import { ReactComponent as CloseIcon } from "../../assets/back.svg";

interface SchoolSearchModalProps {
  modalWidth: string;
  onSelectSchool: (school: School) => void,
  onClose: () => void;
}

export interface School {
  SCHUL_NM: string;
  LCTN_SC_NM: string;
}

const SchoolSearchModal: React.FC<SchoolSearchModalProps> = ({
  modalWidth,
  onSelectSchool,
  onClose,
}) => {
  const [schoolList, setSchoolList] = useState<School[]>([]);

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedSchoolIndex, setSelectedSchoolIndex] = useState<number | null>(null);
  const [selectedSchoolType, setSelectedSchoolType] = useState("02");
  const [searchQuery, setSearchQuery] = useState("");
  

  const filteredSchools = schoolList.filter((school) =>
    school.SCHUL_NM.includes(searchQuery)
  );

  const key = '2a58cfe5fc904bb39bac6c8194b22cb3'
  const getSchoolList = async () => {
    try {
      axios.get(`https://open.neis.go.kr/hub/schoolInfo?KEY=${key}&Type=json&pIndex=1&pSize=100&SCHUL_NM=${searchQuery}&SCHUL_KND_SC_NM=${selectedSchoolType}`)
        .then((response) => {
          console.log(response.data.schoolInfo[1].row)
          const filteredSchoolList = response.data.schoolInfo[1].row.map((item: any) => ({
            SCHUL_NM: item.SCHUL_NM,
            LCTN_SC_NM: item.LCTN_SC_NM,
          }));
          setSchoolList(filteredSchoolList);
        })
    } catch (err) {
      console.log(err);
    }
  };  
  
  const handleSelectedSchool = (school: School, index: number) => {
    setSelectedSchoolIndex(index);
    onSelectSchool(school);
  };
  
  const handleConfirm = () => {
    onClose();
  };

  const goBack = () => {
    onClose();
  }

  return (
    <div className="SchoolSearchModal-fullbox"
      style={{
        width: modalWidth,
      }}>
        <div className="SchoolSearchModal-topbar">
          <div className="SchoolSearchModal-topbar-item">
            <CloseIcon onClick={goBack}/>
            <p>학교 찾기</p>
          </div>
          <BorderLine width={'100%'} height={'2px'}/>
        </div>       
        <div className="SchoolSearchModal-header">
          <p>학교 종류를 선택한 뒤, 이름을 검색해 주세요.</p>
          <div className="SchoolSearchModal-radiobox">
            <label>
              <input
                type="radio"
                value="02"
                checked={selectedSchoolType === "초등학교"}
                onChange={() => setSelectedSchoolType("초등학교")}
              />      
                초등학교
              </label>
            <label>
              <input
                type="radio"
                value="03"
                checked={selectedSchoolType === "중학교"}
                onChange={() => setSelectedSchoolType("중학교")}
              />
              중학교
            </label>
            <label>
              <input
                type="radio"
                value="04"
                checked={selectedSchoolType === "고등학교"}
                onChange={() => setSelectedSchoolType("고등학교")}
              />
              고등학교
            </label>
          </div>
          <div className="SchoolSearchModal-searchbox">
            <input
              placeholder="학교 이름을 입력해주세요."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={getSchoolList}
            >
              검색
            </button>            
          </div>  
        </div>

        <div className="SchoolSearchModal-content">
          <div className="SchoolSearchModal-list">
          <ul>
            {filteredSchools.map((school, index) => (
              <li key={index}>
                <input
                  type="radio"
                  value={school.SCHUL_NM}
                  checked={selectedSchoolIndex === index}
                  onChange={() => handleSelectedSchool(school, index)}
                />
                {school.SCHUL_NM} / {school.LCTN_SC_NM}</li>
            ))}
          </ul>
          </div>
          <button
            className="SchoolSearchModal-confirmbtn"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
  );
};

export default SchoolSearchModal;
