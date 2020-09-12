import React, {useEffect, useState} from 'react';
import SearchItem from "../components/searchItem";

function TestPage() {
  return (
    <>
      <div className={"test-container"}>
        {SearchItem({_id: "1234", articleTitle:"왓더헬", articleContent:"죽어임마!"})}
      </div>
    </>
  )
}

export default TestPage;
