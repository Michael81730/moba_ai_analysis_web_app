import LoginForm from "@/components/login_form"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const cookieStore = await cookies();
  if(cookieStore.has("access")) {
      redirect('/match-analysis');
  }

  return <>
      <Container className="mt-4" style={{width:"28em"}}>
        <Row className="text-center mb-4">
            <h1>Login</h1>
        </Row>

          <Row>
            <Col>
              <LoginForm></LoginForm>
            </Col>
          </Row>
      </Container>
  </>;
}
