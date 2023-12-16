import React, {useState} from 'react';
import {Button, message, Steps} from "antd";
import Loader from "../Loader/Loader";
import Scribe from "../Scribe/Scribe";
import RangeDocs from "../Range/RangeDocs";
import ip from "../ip_config";
import "./App.css";

const clear = () => {
  fetch(`${ip}/clear`)
      .then(response => response.json())
      .then(_ => message.success("Сброс завершен"))
      .catch(error => console.error(error));
}

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [onto, setOnto] = useState(false);
  const [docs, setDocs] = useState(false);

  const steps = [
    {
      title: 'Загрузка',
      content: <Loader setDocs={setDocs} setOnto={setOnto} />,
    },
    {
      title: 'Прореживание текста',
      content: <Scribe/>,
    },
    {
      title: 'Ранжирование документов',
      content: <RangeDocs/>,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
      <div style={{width: 1000, margin: "0 auto", paddingTop: 30}}>
        <Steps current={current} items={items} />
        <div style={{display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <div>
            <Button style={{ margin: '0 8px' }} onClick={prev} disabled={current <= 0}>
                Назад
            </Button>
            <Button type="primary" onClick={next} disabled={current >= steps.length - 1}>
                Вперед
            </Button>
          </div>
          <div>
            <Button onClick={clear}>Сбросить</Button>
          </div>
        </div>
        <div style={{marginTop: 20}}>{steps[current].content}</div>
      </div>
  );
};

export default App;
