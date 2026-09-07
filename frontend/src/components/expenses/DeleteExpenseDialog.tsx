import { Button } from "@/components/ui/button";

interface DeleteExpenseDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

export default function DeleteExpenseDialog({
    open,
    onConfirm,
    onCancel,
    loading = false,
}: DeleteExpenseDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <h2 className="text-xl font-semibold">
                    Delete Expense
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Are you sure you want to delete this
                    expense? This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete"}
                    </Button>
                </div>
            </div>
        </div>
    );
}