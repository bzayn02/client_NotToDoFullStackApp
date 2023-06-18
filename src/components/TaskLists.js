import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskLists, updateTask } from '../redux/taskAction';

const TaskLists = () => {
  const dispatch = useDispatch();

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
                <th>Tasks</th>
                <th>Hours</th>
                <th></th>
              </tr>
            </thead>
            {entryList.map((item, i) => (
              <tbody>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hour}</td>
                  <td className="d-flex justify-content-evenly g-1">
                    <Button variant="danger" type="submit">
                      <i className="fa-solid fa-trash"></i>
                    </Button>
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
          <Table className="table table-striped table-hover ">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Tasks</th>
                <th>Hours</th>
                <th></th>
              </tr>
            </thead>
            {badList.map((item, i) => (
              <tbody>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
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
                    <Button variant="danger" type="submit">
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default TaskLists;
