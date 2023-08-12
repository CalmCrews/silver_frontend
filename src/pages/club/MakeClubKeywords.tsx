import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import ClubStartBase from "../../components/club/ClubStartBase";
import FormButton from "../../components/shared/FormButton";
import KeywordComponet from "../../components/club/KeywordComponet";

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.title.md};
  margin: 50px 0;
`;
const FieldTitle = styled.p`
  width: 100%;
  font-size: ${(props) => props.theme.text.md};
  font-weight: 700;
  text-align: start;
  color: ${(props) => props.theme.colors.black};
  margin: 32px 0;
`;
const KeywordsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MakeClubKeywords = () => {
  const [totalCountList, setTotalCountList] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { clubName, description } = location.state || {};

  const handleOnClick = (id: string) => {
    setTotalCountList((prev) => {
      const isInside = prev.includes(id);
      if (isInside) {
        return [...prev].filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const handleNext = () => {
    // 이제 여기에서 별명 있는지 확인하기
    return navigate("/club/profile", {
      state: {
        clubName: clubName,
        description: description,
        keywordsList: totalCountList,
      },
    });
  };

  return (
    <ClubStartBase>
      <Title>모임 등록</Title>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <FieldTitle>
          모임을 대표하는
          <br />
          키워드 세 개를 선택해 볼까요?
        </FieldTitle>
        <KeywordsDiv>
          <KeywordComponet
            id="gathering"
            innerText="친목/또래모임"
            onClick={handleOnClick}
          />
          <KeywordComponet
            id="daily"
            innerText="일상"
            onClick={handleOnClick}
          />
          <KeywordComponet
            id="economic"
            innerText="경제"
            onClick={handleOnClick}
          />
          <KeywordComponet
            id="biology"
            innerText="동식물"
            onClick={handleOnClick}
          />
          <KeywordComponet
            id="culture"
            innerText="문화/예술"
            onClick={handleOnClick}
          />
          <KeywordComponet
            id="study"
            innerText="교육/공부"
            onClick={handleOnClick}
          />
          <KeywordComponet
            id="life"
            innerText="생활정보"
            onClick={handleOnClick}
          />
          <KeywordComponet
            id="sports"
            innerText="스포츠"
            onClick={handleOnClick}
          />
          <KeywordComponet
            id="religion"
            innerText="종교"
            onClick={handleOnClick}
          />
          <KeywordComponet
            id="health"
            innerText="건강"
            onClick={handleOnClick}
          />
          <KeywordComponet id="etc" innerText="기타" onClick={handleOnClick} />
        </KeywordsDiv>
        <div
          className="button-container"
          style={{ width: "100%", position: "absolute", bottom: "88px" }}
        >
          <FormButton
            disabled={totalCountList.length === 0}
            onClick={handleNext}
          >
            다 했어요!
          </FormButton>
        </div>
      </div>
    </ClubStartBase>
  );
};

export default MakeClubKeywords;
