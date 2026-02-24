import { useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { txRecordActionOptions } from '../lib/stacks';

type Props = {
  userAddress: string;
};

export default function ActionForm({ userAddress }: Props) {
  const [hashValue, setHashValue] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hashValue) return;
    try {
      await openContractCall({
        ...txRecordActionOptions(userAddress, hashValue),
        onFinish: data => {
          console.log('TX finished', data);
          alert(`Transaction submitted: ${data.txId}`);
        },
        onCancel: () => console.log('User canceled')
      });
    } catch (err) {
      console.error(err);
      alert('Failed to initiate transaction.');
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
      <input
        value={hashValue}
        onChange={(e) => setHashValue(e.target.value)}
        placeholder="hash/description (≤32 bytes)"
        required
        style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6 }}
      />
      <button type="submit" style={{ padding: 10, background: 'black', color: 'white', borderRadius: 6 }}>
        Record action
      </button>
      <small style={{ color: '#666' }}>
        This sends a contract call to <code>{process.env.NEXT_PUBLIC_CONTRACT_NAME || 'proof-of-action'}</code>.
      </small>
    </form>
  );
}
