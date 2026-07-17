export default function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">

            <div className="h-52 rounded-3xl bg-slate-200" />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {[1,2,3,4].map((card) => (

                    <div
                        key={card}
                        className="h-40 rounded-2xl bg-slate-200"
                    />

                ))}

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                <div className="h-72 rounded-2xl bg-slate-200" />

                <div className="h-72 rounded-2xl bg-slate-200" />

            </div>

        </div>
    );
}