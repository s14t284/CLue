import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import MainButton from "../Atoms/MainButton";
import { PaperSearchConditionType, YearType, ConferenceType, TaskType, PaperType } from "../../types";
import { API_URL, CONFERENCE_ENDPOINT, TASK_ENDPOINT, YEAR_ENDPOINT } from "../../constants";
import { FetchAPIService, FetchPaperAPIService } from "../../api";

const ModalTableStyle = styled.table`
  border-collapse: collapse;
  border-spacing: 10;
`;

const TitleTd = styled.td`
  padding-right: 10px;
  padding-bottom: 15px;
`;

const DetailSearchButtonDiv = styled.div`
  margin: 10px 0;
  text-align: center;
`;

const customModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type SearchModalPropsType = {
  isOpen: boolean;
  onRequestClose: () => void;
  setPapers: (papers: Array<PaperType>) => void;
  setIsLoading: (boolean) => void;
};

Modal.setAppElement("#root");
const SearchModal: React.FC<SearchModalPropsType> = props => {
  // リクエストに付け加えるstate
  const [year, setYear] = useState<number | null>(null);
  const [conference, setConference] = useState<string | null>(null);
  const [task, setTask] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [intro, setIntro] = useState<string | null>(null);

  // フォームの選択肢に関するstate
  const [years, setYears] = useState<(number | null)[]>([]);
  const [conferences, setConferences] = useState<(string | null)[]>([]);
  const [tasks, setTasks] = useState<(string | null)[]>([]);

  const fetchPaperApiService = new FetchPaperAPIService();
  const fetchConfApiService = new FetchAPIService(API_URL, CONFERENCE_ENDPOINT);
  const fetchTaskApiService = new FetchAPIService(API_URL, TASK_ENDPOINT);
  const fetchYearApiService = new FetchAPIService(API_URL, YEAR_ENDPOINT);

  const searchPapers = () => {
    const queryParam: PaperSearchConditionType = {
      year: year,
      task: task,
      conference: conference,
      title: title,
      introduction: intro,
    };
    getPapers(queryParam);
    props.setIsLoading(false);
    props.onRequestClose();
  };

  async function getPapers(queryParam: PaperSearchConditionType) {
    fetchPaperApiService
      .fetchPaperAPI("GET", {}, queryParam)
      .then(res => {
        return res.json();
      })
      .then(res => props.setPapers(res));
  }

  const getYears = async () => {
    fetchYearApiService
      .fetchAPI("GET")
      .then(res => {
        return res.json();
      })
      .then((res: YearType[]) => {
        const years: (number | null)[] = [null];
        res.forEach(item => {
          years.push(item.year);
        });
        return years;
      })
      .then(res => setYears(res));
  };

  const getConferenceList = async () => {
    fetchConfApiService
      .fetchAPI("GET")
      .then(res => {
        return res.json();
      })
      .then((res: ConferenceType[]) => {
        const conferences: (string | null)[] = [null];
        res.forEach(item => {
          conferences.push(item.conferenceName);
        });
        return conferences;
      })
      .then(res => setConferences(res));
  };

  const getTaskList = async () => {
    fetchTaskApiService
      .fetchAPI("GET")
      .then(res => {
        return res.json();
      })
      .then((res: TaskType[]) => {
        const tasks: (string | null)[] = [null];
        res.forEach(item => {
          tasks.push(item.taskName);
        });
        return tasks;
      })
      .then(res => setTasks(res));
  };

  const onSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(e.target.value));
  };

  const onSelectConference = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConference(e.target.value);
  };

  const onSelectTask = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTask(e.target.value);
  };

  const onSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntro(e.target.value);
  };

  useEffect(() => {
    // フォームの選択肢の取得
    getYears();
    getConferenceList();
    getTaskList();
  }, []);

  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onRequestClose} style={customModalStyle}>
      <ModalTableStyle>
        <tbody>
          <tr>
            <TitleTd>公開年</TitleTd>
            <td>
              <select name="year" onChange={onSelectYear}>
                {years.map((year, i) => {
                  return (
                    <option value={year} key={i}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <TitleTd>Conference</TitleTd>
            <td>
              <select name="conference" onChange={onSelectConference}>
                {conferences.map((conf, i) => {
                  return (
                    <option value={conf} key={i}>
                      {conf}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <TitleTd>タスク名</TitleTd>
            <td>
              <select name="task" onChange={onSelectTask}>
                {tasks.map((task, i) => {
                  return (
                    <option value={task} key={i}>
                      {task}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <TitleTd>論文タイトル</TitleTd>
            <td>
              <input onChange={onSetTitle} />
            </td>
          </tr>
          <tr>
            <TitleTd>アブストに含まれる単語</TitleTd>
            <td>
              <input onChange={onIntroChange} />
            </td>
          </tr>
        </tbody>
      </ModalTableStyle>
      <DetailSearchButtonDiv>
        <MainButton
          onClick={() => {
            props.setIsLoading(true);
            searchPapers();
          }}
        >
          検索
        </MainButton>
      </DetailSearchButtonDiv>
    </Modal>
  );
};

export default SearchModal;
