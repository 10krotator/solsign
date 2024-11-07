import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TermsAndConditions = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Terms and Conditions
        </span>
      </DialogTrigger>
      <DialogContent className="flex flex-col p-0 text-primary">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="text-lg font-semibold">Terms and Conditions</DialogTitle>
          <p className="text-xs text-gray-500">
            Please read these terms carefully before using Solana Sign.
          </p>
        </DialogHeader>
        <ScrollArea className="flex-grow px-4 pb-4">
          <div className="space-y-2 text-xs">
            <p>
              Welcome to Solana Sign, a service that allows you to sign documents with your Solana wallet. Your files are stored on the Irys chain. By using our service, you agree to the following terms:
            </p>

            <h3 className="font-bold">1. Data Permanence</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                Once uploaded, storage cannot be reclaimed. Files will remain on the Irys chain
                indefinitely.
              </li>
              <li>
                For public uploads, files will be accessible forever, even if &ldquo;deleted&rdquo;
                from your Solana Sign interface.
              </li>
              <li>
                When a public file is &ldquo;deleted,&rdquo; it will still exist on the Irys chain.
                The file space will continue to be shown in your storage indicator.
              </li>
            </ul>

            <h3 className="font-bold">2. Privacy and Sharing</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>Private uploads cannot be shared.</li>
              <li>
                Public uploads will be permanently accessible, even after deletion from your Solana Sign interface.
              </li>
            </ul>

            <h3 className="font-bold">3. Content Responsibility</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                Solana Sign is not responsible for content posted on Solana Sign. All data is
                posted directly to the Irys chain.
              </li>
              <li>
                Any content{' '}
                <a
                  href="https://hackmd.io/@mBbfLZ3iSX6d_bN-u5OBpw/rkwLsBWJJe"
                  target="_blank"
                  style={{ textDecoration: 'underline', textDecorationColor: 'currentColor' }}
                  // eslint-disable-next-line
                  onMouseEnter={(e: any) => (e.target.style.textDecoration = 'none')}
                  // eslint-disable-next-line
                  onMouseLeave={(e: any) => (e.target.style.textDecoration = 'underline')}
                >
                  takedown requests
                </a>{' '}
                should be directed to the Irys team.
              </li>
            </ul>

            <h3 className="font-bold">4. Service Level Agreement and Liability</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                Solana Sign makes no guarantees regarding service level agreements (SLAs) and
                cannot be held liable for any outages or otherwise.
              </li>
              <li>
                By signing the authentication message, you agree that you will not hold Solana Sign, its affiliates, officers, directors, employees, or agents liable for any
                direct, indirect, incidental, special, consequential or exemplary damages, including
                but not limited to, damages for loss of profits, goodwill, use, data or other
                intangible losses resulting from the use of or inability to use the service.
              </li>
            </ul>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};