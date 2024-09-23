import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 leading-tight tracking-tighter">welcome to solanasign</h1>
      <div className="flex gap-4 justify-between">
      <Button>
        <Link href="/sign-document">
          Sign a Document
        </Link>
      </Button>
      <Button>
        <Link href="/upload-document">
          Upload Document
        </Link>
      </Button>
      </div>
    </div>
  );
}
