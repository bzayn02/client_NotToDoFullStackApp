import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTaskAction,
  getTaskLists,
  updateTask,
} from '../redux/taskAction';

const TaskLists = () => {
  const dispatch = useDispatch();

  const [ids, setIds] = useState([]);

  const { taskList } = useSelector((state) => state.tasks);

  // No dependency causes code execution everytime the component renders
  useEffect(() => {
    dispatch(getTaskLists());
  }, [dispatch]);

  const handleOnSwitch = (obj) => {
    if (window.confirm('Are you sure you want to switch the task?')) {
      dispatch(updateTask(obj));
    }
  };

  const entryList = taskList.filter(({ type }) => type === 'entry');
  const badList = taskList.filter(({ type }) => type === 'bad');

  const handleOnSelect = (e) => {
    const { value, checked } = e.target;
    checked
      ? setIds([...ids, value])
      : setIds(ids.filter((id) => id !== value));
  };
  console.log(ids);

  const handleOnDelete = () => {
    if (window.confirm('Are you sure you want to delete the tasks?')) {
      dispatch(deleteTaskAction(ids));
      setIds([]);
    }
  };

  const total = taskList.reduce((totalHour, { hour }) => {
    return totalHour + hour;
  }, 0);
  return (
    <div>
      <Row className="mt-4">
        <Col md="6">
          <h3>Entry List</h3>
          <hr />

          <Table className="table table-striped table-hover ">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Delete</th>
                <th>Tasks</th>
                <th>Hours</th>
                <th></th>
              </tr>
            </thead>
            {entryList.map((item, i) => (
              <tbody>
                <tr key={i}>
                  <td>{i + 1}</td>

                  <td>
                    <Form.Check value={item._id} onChange={handleOnSelect} />
                  </td>
                  <td> {item.task}</td>
                  <td>{item.hour}</td>
                  <td className="d-flex justify-content-evenly g-1">
                    {/* <Button variant="danger" type="submit">
                      <i className="fa-solid fa-trash"></i>
                    </Button> */}
                    <Button
                      variant="info"
                      onClick={() =>
                        handleOnSwitch({ _id: item._id, type: 'bad' })
                      }
                      title="Mark as bad task"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Col>
        <Col md="6">
          <h3>Bad List</h3>
          <hr />
          <Table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Delete</th>
                <th>Tasks</th>
                <th>Hours</th>
                <th></th>
              </tr>
            </thead>
            {badList.map((item, i) => (
              <tbody>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <Form.Check value={item._id} onChange={handleOnSelect} />
                  </td>
                  <td> {item.task}</td>
                  <td>{item.hour}</td>
                  <td className="d-flex justify-content-evenly g-1">
                    <Button
                      variant="success"
                      onClick={() =>
                        handleOnSwitch({ _id: item._id, type: 'entry' })
                      }
                      title="Mark as good task"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </Button>
                    {/* <Button variant="danger" type="submit">
                      <i className="fa-solid fa-trash"></i>
                    </Button> */}
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
          <hr />
          <Table className="table table-striped table-hover  d-flex w-full justify-content-center">
            <tbody>
              <tr>
                <td>Total hours you could have saved:</td>
                <td>
                  {badList.reduce((totalHour, item) => {
                    return totalHour + item.hour;
                  }, 0)}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <hr />
      <Row>
        <Table className="table table-striped table-hover w-full d-flex justify-content-center">
          <tbody>
            {' '}
            <tr>
              <td>Total hours allocated in a week:</td>
              <td>{total}hrs/168hrs</td>
            </tr>
          </tbody>
        </Table>
      </Row>

      <Row>
        <Col>
          {' '}
          {ids.length > 0 && (
            <div className="d-grid">
              <Button onClick={handleOnDelete} variant="danger">
                Delete {ids.length} tasks
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TaskLists;
