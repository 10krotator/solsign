import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface WalletAddressInputsProps {
  walletAddresses: string[];
  setWalletAddresses: (addresses: string[]) => void;
}

export const WalletAddressInputs = ({ walletAddresses, setWalletAddresses }: WalletAddressInputsProps) => {
  const addWalletInput = () => {
    setWalletAddresses([...walletAddresses, '']);
  };

  const removeWalletInput = (index: number) => {
    const updatedAddresses = walletAddresses.filter((_, i) => i !== index);
    setWalletAddresses(updatedAddresses.length ? updatedAddresses : ['']);
  };

  const handleWalletChange = (index: number, value: string) => {
    const updatedAddresses = [...walletAddresses];
    updatedAddresses[index] = value;
    setWalletAddresses(updatedAddresses);
  };

  return (
    <div className="space-y-4">
      <span className="text-2xl font-semibold leading-tight tracking-tighter mb-2">add wallets to sign the document</span>
      {walletAddresses.map((address, index) => (
        <div key={index} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter wallet address"
            value={address}
            onChange={(e) => handleWalletChange(index, e.target.value)}
            required
            className="flex-grow"
          />
          {walletAddresses.length > 1 && (
            <Button type="button" onClick={() => removeWalletInput(index)} variant="destructive" className="shrink-0">
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" onClick={addWalletInput} className="w-full">Add Another Wallet</Button>
    </div>
  );
};