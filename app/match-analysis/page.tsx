import Container from 'react-bootstrap/Container';
import { checkAuth } from '@/app/server_actions'
import MatchAnalsysAccordion from "@/components/match_analysis_accordion"

export default async function Page() {
  await checkAuth();

  return <Container className="mt-4">
    <MatchAnalsysAccordion></MatchAnalsysAccordion>
  </Container>;
}
