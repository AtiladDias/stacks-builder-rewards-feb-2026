import { useEffect, useState } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import ActionForm from '../components/ActionForm';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function Home() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(() => {
        setUserData(userSession.loadUserData());
      });
    }
  }, []);

  function connect() {
    showConnect({
      userSession,
      appDetails: { name: 'Proof-of-Action', icon: window.location.origin + '/icon.png' },
      onFinish: () => setUserData(userSession.loadUserData()),
      onCancel: () => console.log('User canceled')
    });
  }

  function signOut() {
    userSession.signUserOut();
    setUserData(null);
  }

  const stxAddress =
    userData?.profile?.stxAddress?.testnet ||
    userData?.profile?.stxAddress?.mainnet;

  return (
    <div style={{ maxWidth: 760, margin: '40px auto', fontFamily: 'system-ui, Arial' }}>
      <h1>Proof-of-Action (Stacks)</h1>

      {!userData ? (
        <button onClick={connect} style={{ padding: 10, background: 'black', color: 'white', borderRadius: 6 }}>
          Connect Wallet (Stacks)
        </button>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div>Connected: <code>{stxAddress}</code></div>
            <button onClick={signOut} style={{ padding: 8, background: '#eee', border: '1px solid #ddd', borderRadius: 6 }}>
              Sign out
            </button>
          </div>
          <div style={{ marginTop: 20 }}>
            <ActionForm userAddress={stxAddress} />
          </div>
        </>
      )}

      <p style={{ marginTop: 24, color: '#666' }}>
        Login via <code>@stacks/connect</code> and transaction via <code>@stacks/transactions</code>.
      </p>
    </div>
  );
}
