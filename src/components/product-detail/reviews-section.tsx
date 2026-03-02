"use client";
import reviewsData from "@/data/reviews.json";
import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function ReviewsSection({ productId }: { productId: string }) {
  const reviews = reviewsData.filter((r) => r.productId === productId);
  if (reviews.length === 0) reviews.push(...reviewsData.slice(0, 3));
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Customer Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10"><AvatarFallback className="bg-purple-100 text-purple-700 font-bold text-sm">{review.avatar}</AvatarFallback></Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1"><span className="font-semibold text-sm">{review.userName}</span><span className="text-xs text-gray-400">{review.date}</span></div>
              <div className="flex items-center gap-0.5 mb-2">{Array.from({ length: 5 }, (_, i) => (<Star key={i} className={"h-3.5 w-3.5 " + (i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />))}</div>
              <p className="font-medium text-sm mb-1">{review.title}</p>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <Button variant="ghost" size="sm" className="mt-2 text-xs text-gray-500 hover:text-purple-700"><ThumbsUp className="h-3 w-3 mr-1" />Helpful ({review.helpful})</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
