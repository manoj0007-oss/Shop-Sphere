import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
export function SkeletonCard() {
  return (
    <Card className="overflow-hidden border-0 shadow-sm"><div className="aspect-square"><Skeleton className="w-full h-full" /></div>
      <CardContent className="p-3 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-5 w-1/3" /><Skeleton className="h-8 w-full" /></CardContent>
    </Card>
  );
}
