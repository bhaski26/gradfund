import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    onRetry: () => void;
}

export default function DashboardError({
    onRetry,
}: Props) {
    return (
        <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center">
            <AlertTriangle className="h-14 w-14 text-red-500" />

            <h2 className="text-2xl font-bold">
                Something went wrong
            </h2>

            <p className="text-slate-500">
                We couldn't load your dashboard.
            </p>

            <Button onClick={onRetry}>
                Try Again
            </Button>
        </div>
    );
}