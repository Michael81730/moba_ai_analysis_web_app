import SignupForm from "@/components/signup_form"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Page() {
  return <>
      <Container className="mt-4" style={{width:"28em"}}>
        <Row className="text-center mb-4">
            <h1>Signup</h1>
        </Row>
          <Row>
            <Col>
              <SignupForm></SignupForm>
            </Col>
          </Row>
      </Container>
  </>;
}
