export default function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="h-52 rounded-3xl bg-slate-200" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="h-56 rounded-3xl bg-slate-200"
                    />
                ))}
            </div>
        </div>
    );
}