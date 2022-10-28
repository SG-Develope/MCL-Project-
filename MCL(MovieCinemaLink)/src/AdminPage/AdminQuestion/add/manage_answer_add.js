// manage_answer_add.js
// 관리자 Q&A 답변등록

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const manage_answer_add = (prop) => {
  const { id } = useParams();

  // DB 데이터 불러오기 (상세정보)
  const [AnswerAdd, setAnswerAdd] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:80/manage/manage_answer_detail?id=${id}`)
      .then((res) => {
        setAnswerAdd(res.data);
      });
  }, []);

  // DB 데이터 불러오기 (리스트 추가)
  const addQA = () => {
    const answer_title = document.getElementById("answerTitle").value;
    const answer_content = document.getElementById("answerContent").value;

    const params = {
      question_id: id,
      answer_title: answer_title,
      answer_content: answer_content,
      member_id: 1,
    };

    axios.post(`http://localhost:80/manage/manage_answer_add`, params);

    // 새로고침
    window.location.replace(`/manage_question_detail/${id}`);
  };

  return (
    <div>
      <div className="manage_answer_add">
        <div class="ui_container">
          <h3>Q & A 답변등록</h3>
          <div class="ui_border">
            <div class="border_cont">
              <table>
                <thead>
                  <tr>
                    <th>제목</th>
                    <td>
                      <input
                        type="text"
                        id="answerTitle"
                        className="answers_title"
                      />
                    </td>
                  </tr>
                </thead>
              </table>

              {/* 내용 */}
              <textarea id="answerContent" cols="30" rows="10"></textarea>
            </div>

            <div class="Notice_btn">
              <button onClick={addQA}>등록</button>
              <Link to="/manage_question_list">
                <button>목록</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default manage_answer_add;
