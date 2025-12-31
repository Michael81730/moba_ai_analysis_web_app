import Container from 'react-bootstrap/Container';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const cookieStore = await cookies();
  if(!cookieStore.has("access")) {
      redirect('/login');
  }
  return <>
      <Container className="mt-5" style={{width:"28em"}}>
        <h1>Match Analysis</h1>
      </Container>
  </>;
}
