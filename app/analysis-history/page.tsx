import Container from 'react-bootstrap/Container';
import { checkAuth } from '@/app/server_actions'

export default async function Page() {
  await checkAuth();

  return <>
      <Container className="mt-5" style={{width:"28em"}}>
        <h1>Analysis History</h1>
      </Container>
  </>;
}
