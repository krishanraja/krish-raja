import { AskProvider, useAsk } from '@/components/home/EnquiryDialog';
import DiscoveryDocument from '@/components/DiscoveryDocument';
import type { DiscoveryProfile } from '@/content/discovery';
import { usePhoneDocumentScale, useIsMobile } from '@/hooks/use-mobile';
import './discovery.css';

function ProfileWithEnquiry({ profile }: { profile: DiscoveryProfile }) {
  const ask = useAsk();
  usePhoneDocumentScale(useIsMobile());
  return <DiscoveryDocument profile={profile} onEnquire={() => ask(profile.intent)} />;
}

export default function Discovery({ profile }: { profile: DiscoveryProfile }) {
  return <AskProvider><ProfileWithEnquiry profile={profile} /></AskProvider>;
}
