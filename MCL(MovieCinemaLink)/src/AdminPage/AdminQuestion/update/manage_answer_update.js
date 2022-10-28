// manage_answer_update.js
// 관리자 Q&A 답변수정

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const manage_answer_update = () => {
  const { id } = useParams();

  // DB 데이터 불러오기 (상세정보)
  const [AnswerUpdate, setAnswerUpdate] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:80/manage/manage_answer_detail?id=${id}`)
      .then((res) => {
        setAnswerUpdate(res.data);
      });
  }, []);

  // DB 데이터 불러오기 (리스트 수정)
  const UpdateQA = () => {
    const answer_id = document.getElementById("answerId").value;
    const answer_title = document.getElementById("answerTitle").value;
    const answer_content = document.getElementById("answerContent").value;

    const params = {
      member_id: 1,
      answer_id: answer_id,
      answer_title: answer_title,
      answer_content: answer_content,
    };

    axios.post(`http://localhost:80/manage/manage_answer_update`, params);

    // 새로고침
    window.location.replace(`/manage_question_detail/${id}`);
  };

  return (
    <div>
      <div className="manage_answer_update">
        <div class="ui_container">
          <h3>Q & A 답변수정</h3>
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
                        className="AnswerUpdate_title"
                        placeholder={AnswerUpdate.answer_title}
                      />
                    </td>
                  </tr>
                  <input
                    type="hidden"
                    id="answerId"
                    value={AnswerUpdate.answer_id}
                  />
                </thead>
              </table>

              {/* 내용 */}
              <textarea
                id="answerContent"
                cols="30"
                rows="10"
                placeholder={AnswerUpdate.answer_content}
              />
            </div>

            <div class="Notice_btn">
              <button onClick={UpdateQA}>수정완료</button>
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

export default manage_answer_update;