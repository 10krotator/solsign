import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@tiplink/wallet-adapter-react-ui";
import { useAuth } from "@/app/context/auth";
import { TermsAndConditions } from "@/components/common/TermsAndConditions";

export function SignInButton() {
  const { publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const { status, triggerAuth, loading } = useAuth();

  const connectedButNotAuthenticated = publicKey && status === 'unauthenticated';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-semibold text-primary lowercase leading-tight tracking-tighter">
        {!connectedButNotAuthenticated ? 'Connect Wallet' : 'Prove Ownership'}
      </div>
      <div className="text-sm text-gray-500 text-center lowercase">
        {!connectedButNotAuthenticated
          ? 'Select wallet to continue using Solana Sign'
          : 'You must prove you own the wallet to continue'}
      </div>
      {connectedButNotAuthenticated && (
        <div className="text-sm text-gray-700 text-center lowercase">
          By signing, you acknowledge and accept the <TermsAndConditions />.
        </div>
      )}
      <Button
        type="button"
        onClick={() => {
          if (!publicKey) {
            setVisible(true);
          } else {
            triggerAuth();
          }
        }}
        className="btn-tertiary font-semibold"
        disabled={loading}
      >
        {!connectedButNotAuthenticated ? 'Connect' : 'Sign'}
      </Button>
    </div>
  );
}