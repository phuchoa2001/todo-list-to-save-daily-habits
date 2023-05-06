import React, { useState } from 'react';
import moment from 'moment';
import { useLocalStorageState } from 'ahooks';
import { Input, Button, Tag, Space, List, Typography, Checkbox } from 'antd';

import "./home.scss";

const { TextArea } = Input;
const { Text } = Typography;

const STATUS = {
  warning: "warning",
  success: "success"
}

const KEY_LOCAL_STORAGE = {
  TODO_LIST: "TODO_LIST"
}

function Home(props) {
  const [value, setValue] = useState("");
  const [data = [], setData] = useLocalStorageState(
    KEY_LOCAL_STORAGE.TODO_LIST
  );

  const handleAdd = () => {
    const todo = {
      id: Math.random(),
      value,
      time: moment().format('HH:mm'),
      hour: moment().format('HH'),
      minute: moment().format('mm'),
      date: moment().format("DD/MM/YYYY"),
      status: STATUS.warning,
      show: 0
    }
    setValue("");
    const dataNew = [...data, todo]
    setData(dataNew);
  }

  const handleAddHabits = (todo) => {
    const dataNew = [...data, {
      id: Math.random(),
      value: todo.value,
      time: moment().format('HH:mm'),
      hour: moment().format('HH'),
      minute: moment().format('mm'),
      date: moment().format("DD/MM/YYYY"),
      status: STATUS.warning,
      show: 0
    }]
    setData(dataNew);
  }
  const handleCheckbox = (status, id) => {
    const newPrev = [...data];
    const index = newPrev.findIndex((item) => item.id === id);
    newPrev[index].status = status;
    setData(newPrev);
  }

  const renderListPresent = () => {
    return [...data].filter((item) => item.date === moment().format("DD/MM/YYYY")).reverse();
  }

  const renderHabits = () => {
    //  lấy ngày trong quá khử . láy phần tử có khung giờ bằng khung giờ hiện tại 
    const dataFilter = [...data].filter((item) =>
      item.date !== moment().format("DD/MM/YYYY") &&
      item.hour === moment().format('HH') &&
      (!renderListPresent().some((j) => j.value === item.value))
    );

    // chuyển đổi số lượng thành phẩn trùng nhau thành field show
    let arrNumberOfData = [];
    dataFilter.forEach(item => {
      if (arrNumberOfData.some(j => j.value === item.value)) {
        const index = arrNumberOfData.findIndex((j) => item.value === j.value);
        arrNumberOfData[index] = {
          ...arrNumberOfData[index],
          show: arrNumberOfData[index].show + 1
        }
      } else {
        arrNumberOfData = [...arrNumberOfData, item];
      }
    })

    // sếp xếp mảng theo field show
    arrNumberOfData.sort((a, b) => b.show - a.show);
    return arrNumberOfData;
  };

  const arrHabits = renderHabits(data);

  return (
    <div className='home'>
      <div className='home-wrapper'>
        <div className='home-header'>
          <div className='home-header-box' />
          <p className='home-title'>Todo List Hằng ngày thói quen người dùng</p>
        </div>
        <div className='home-content'>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="VD : tôi ăn cơm..."
            autoSize={{
              minRows: 5,
              maxRows: 8,
            }}
            className={"home-content-input"}
          />
          <div className='home-content-action'>
            <Button
              type="primary"
              danger
              size='small'
              className='home-content-btn'
              onClick={handleAdd}
            >
              Thêm công việc
            </Button>
          </div>
          <p className='home-title'>* Thói quen hằng ngày <Tag color="green">{moment().format('HH')}:00</Tag></p>
          <Space className='home-content-habits' wrap>
            {arrHabits.length !== 0 ?
              arrHabits.map(item => (
                <Tag color="gold" style={{ cursor: "pointer" }}
                  onClick={() => handleAddHabits(item)} >
                  {item.value}
                </Tag>
              ))
              : (
                <p>Hiện tại không có thói quen khung giờ này</p>
              )
            }
          </Space>
        </div>
        <p className='home-title home-content-list'>Danh sách công việc</p>
        <div className='home-content-list-wrapper'>
          <List
            bordered
            dataSource={renderListPresent(data)}
            renderItem={(item, index) => (
              <List.Item
                onClick={() => handleCheckbox(item.status === STATUS.success ? STATUS.warning : STATUS.success, item.id)}
                style={{ cursor: "pointer" }}
              >
                <Space wrap className=' home-content-list-box'>
                  <Checkbox checked={item.status === STATUS.success}
                    className='home-content-checkbox'>
                    <Text delete={item.status === STATUS.success}>{item.value}</Text>
                  </Checkbox>
                  <Tag color={item.status}>{item.time}</Tag>
                </Space>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;