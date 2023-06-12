import './App.css';
import TaskForm from './components/TaskForm';
import { Col, Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskLists from './components/TaskLists';
import { fetchTask } from './helper/axiosHelper';
import { useState } from 'react';

function App() {
  const [list, setList] = useState([]);
  const getTaskLists = async () => {
    // taskList from server
    const { status, taskList } = await fetchTask();
    if (status === 'success' && taskList.length) {
      setList(taskList);
    }
  };
  console.log(list);
  return (
    <div className="App wrapper text-light min-vh-100">
      <Container>
        {/* Toast Message */}

        {/* Header */}
        <Row className="p-4 mb-1">
          <Col>
            <h1>Task Manager</h1>
          </Col>
        </Row>
        {/* Task Form */}
        <TaskForm getTaskLists={getTaskLists} />
        {/* Task Lists */}
        <TaskLists list={list} />
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
