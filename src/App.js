import './App.css';
import TaskForm from './components/TaskForm';
import { Col, Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskLists from './components/TaskLists';

function App() {
  return (
    <div className="App wrapper text-light min-vh-100">
      <Container>
        {/* Toast Message */}

        {/* Header */}
        <Row className="p-4">
          <Col>
            <h1>Task Manager</h1>
          </Col>
        </Row>
        {/* Task Form */}
        <TaskForm />
        {/* Task Lists */}
        <TaskLists />
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
