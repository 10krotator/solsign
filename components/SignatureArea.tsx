import { Button } from '@/components/ui/button';

interface SignatureAreaProps {
    onSign: () => void;
}

export default function SignatureArea({ onSign }: SignatureAreaProps) {
    return (
        <div className="mt-8 text-center">
            <Button
                onClick={onSign}
            >
                Sign Document
            </Button>
        </div>
    );
}