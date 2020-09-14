import React, {useEffect, useState} from 'react';
import SearchItem from "../components/searchItem";

function TestPage() {
  return (
    <>
      <div className={"test-container"}>
        {SearchItem({_id: "10203040", articleTitle:"테스트", articleContent:"입니다.", searchKeyword:""})}
      </div>
    </>
  )
}

export default TestPage;
