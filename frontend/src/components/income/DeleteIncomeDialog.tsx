import { AlertTriangle, X } from "lucide-react";

interface DeleteIncomeDialogProps {
    open: boolean;
    loading?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteIncomeDialog({
    open,
    loading = false,
    onCancel,
    onConfirm,
}: DeleteIncomeDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="mt-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Delete Income?
                    </h2>

                    <p className="mt-3 leading-relaxed text-slate-500">
                        Are you sure you want to delete this income
                        record? This action cannot be undone.
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>

            </div>
        </div>
    );
}