'use client';

import '@dialectlabs/react-ui/index.css';
import { NotificationsButton } from '@dialectlabs/react-ui';
import { DialectSolanaSdk } from '@dialectlabs/react-sdk-blockchain-solana';

const DAPP_ADDRESS = 'SiGNqJezFw5eGDVs7fTTVxC6VuKmwD7DYs7o1sHwbs4';

export const DialectNotificationComponent = () => {
  return (
    <div className="dialect">
      <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
        <NotificationsButton />
      </DialectSolanaSdk>
    </div>
  );
};
