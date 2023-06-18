import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskList } from '../redux/taskAction';
import { toast } from 'react-toastify';

const TaskForm = () => {
  const { taskList } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const totalHrsPerWeek = 168;
  const total = taskList.reduce((totalHour, { hour }) => {
    return totalHour + hour;
  }, 0);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Checking total hours if possible to add new task
    if (totalHrsPerWeek >= total + +formData.hour) {
      return dispatch(addTaskList(formData));
    }
    toast.error(
      'You cannot add this task since total hour will be more than total hours available in a week.'
    );

    // console.log(formData);
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="p-4 bg-info-subtle rounded-4">
          <Col md="6">
            <Form.Control
              type="task"
              placeholder="Enter task"
              name="task"
              onChange={handleOnChange}
              required
            />
          </Col>
          <Col md="3">
            {' '}
            <Form.Control
              type="hour"
              placeholder="Enter Hours"
              name="hour"
              onChange={handleOnChange}
              required
              max={totalHrsPerWeek}
              min={1}
            />
          </Col>
          <Col md="3" className=" d-grid">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TaskForm;
