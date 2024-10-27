"use client";

import { WalletMultiButton } from "@/components/wallet_connect_button/WalletMultiButton";
import { AuthProvider } from "@/app/context/auth";
import { useDevice } from '@/app/context/device';
import { NotificationProvider } from '@/app/context/notification';
// import { WebIrysProvider } from '@/app/context/webIrys';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { TipLinkWalletAdapter } from '@tiplink/wallet-adapter';
import { DefaultTipLinkWalletModalProvider } from '@tiplink/wallet-adapter-react-ui';

import {
  AlignJustify,
  Files,
  Github,
  LucideIcon,
  Trash2 as Trash,
  Twitter,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface SidebarItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

const defaultIconProps = { size: 18, strokeWidth: 2.5 };


function Header({ title }: { title: string }) {
  const { isMobile } = useDevice();

  return (
    <div className="flex justify-between items-center w-full gap-3">
      <div className="flex flex-col flex-shrink-0">
        {!isMobile && <h1 className="text-2xl font-semibold text-[#142A1D]">{title}</h1>}
      </div>
      <div
        className="ml-4 flex items-center gap-4"
        style={{
          marginLeft: isMobile ? '30px' : '0px',
        }}
      >
        {!isMobile && <WalletMultiButton className="flex-shrink-0" />}
        {isMobile && (
          <Image
            onClick={() => window.open('https://www.chakra.network/', '_blank')}
            src="/chakra_icon.png"
            alt="logo"
            width={45}
            height={45}
          />
        )}
      </div>
    </div>
  );
}

function SidebarLabel({
  label,
  icon: Icon,
  isActive,
  onClick,
}: SidebarItem & { isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`flex items-center justify-left hover:bg-[#63E7871A] select-none px-4 py-2 rounded-lg mb-4 cursor-pointer w-full ${
        isActive ? 'bg-[#63E7871A] font-semibold' : ''
      }`}
      onClick={onClick}
    >
      <div className="text-secondary">
        <Icon {...defaultIconProps} />
      </div>
      <p className="ml-2.5 text-md text-secondary text-black">{label}</p>
    </button>
  );
}

const SocialLinks = () => {
  return (
    <div className="mt-auto mb-4 flex justify-start space-x-4 px-4">
      <Link href="https://twitter.com/chakra_ai" target="_blank" rel="noopener noreferrer" passHref>
        <Twitter className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer" />
      </Link>
      <Link
        href="https://github.com/chakra-Network/drive"
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <Github className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer" />
      </Link>
    </div>
  );
};

function AppWithSidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  // const { currentPublicKey } = useAuth();
  const { isMobile } = useDevice();
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const sidebarItems: SidebarItem[] = useMemo(
    () => [
      {
        label: 'All Files',
        icon: Files,
        path: '/',
      },
      {
        label: 'Shared with me',
        icon: Users,
        path: '/shared-with-me',
      },
      {
        label: 'Trash',
        icon: Trash,
        path: '/trash',
      },
    ],
    []
  );

  const handleSidebarClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
      console.log('TRIGGERING ROUTE CHANGE', sidebarItems[index].path);
      if (isMobile) {
        setSidebarOpen(false);
      }
      router.push(sidebarItems[index].path);
    },
    [router, sidebarItems, isMobile]
  );


  useEffect(() => {
    const path = window.location.pathname;
    let index = 0;
    switch (path) {
      case '/shared-with-me':
        index = 1;
        break;
      case '/trash':
        index = 2;
        break;
      default:
        index = 0;
    }
    setActiveIndex(index);
  }, []);


  if (isMobile) {
    return (
      <div className="flex min-h-screen h-full w-full overflow-x-scroll relative">
        {!sidebarOpen && (
          <AlignJustify
            className="absolute top-4 left-1 m-2 text-black"
            width={28}
            height={28}
            onClick={() => setSidebarOpen(true)}
          />
        )}
        <div className="bg-white">
          <div
            className="flex flex-col w-[100vw] h-[100vh] fixed inset-0 z-[10] bg-[#F6F6F6] rounded-r-3xl pt-4"
            style={{
              transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            <div className="flex justify-between items-center w-full px-4 py-2">
              <X
                className="text-black cursor-pointer"
                width={28}
                height={28}
                onClick={() => setSidebarOpen(false)}
              />
              <WalletMultiButton
                className="!bg-transparent !border-green-600 !border-opacity-20 !px-2"
                style={{
                  display: sidebarOpen ? '' : 'none',
                }}
              />
            </div>

            {sidebarItems.map((item, index) => (
              <SidebarLabel
                key={item.path}
                {...item}
                isActive={index === activeIndex}
                onClick={() => handleSidebarClick(index)}
              />
            ))}
            <SocialLinks />
          </div>
        </div>
        <div className="flex flex-col p-4 w-full bg-white">
          <Header title={sidebarItems[activeIndex].label} />
          {children}
        </div>
      </div>
    );    
  }

  return (
    <div className="flex h-screen w-full">
      <div className="bg-white">
        <div className="flex flex-col w-[250px] h-full bg-[#142A1D0A] px-4 rounded-r-3xl">
          <a
            className="flex items-center justify-center py-4 gap-4"
            href="https://www.solsign-two.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/chakra_word_logo.svg" alt="logo" width={450} height={450} />
          </a>
          {sidebarItems.map((item, index) => (
            <SidebarLabel
              key={item.path}
              {...item}
              isActive={index === activeIndex}
              onClick={() => handleSidebarClick(index)}
            />
          ))}
          <SocialLinks /> 
        </div>
      </div>
      <div className="p-4 w-full bg-white h-[100vh] overflow-y-clip">
        <Header title={sidebarItems[activeIndex].label} />
        {children}
      </div>
    </div>
  );
}

export default function AppWithSidebarAndWallet({ children }: { children: React.ReactNode }) {
  const tipLinkWalletAdapter = useMemo(
    () =>
      new TipLinkWalletAdapter({
        theme: 'light',
        title: 'SolSign Two',
        clientId: '64f5daca-3d5a-4ce6-9431-9d3bc0f1e739',
        hideWalletOnboard: true,
      }),
    []
  );
  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC_URL as string}>
      <WalletProvider wallets={[tipLinkWalletAdapter]} autoConnect>
        <DefaultTipLinkWalletModalProvider>
          <AuthProvider>
            <NotificationProvider>
              {/* <WebIrysProvider> */}
                <AppWithSidebar>{children}</AppWithSidebar>
              {/* </WebIrysProvider> */}
            </NotificationProvider>
          </AuthProvider>
        </DefaultTipLinkWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
