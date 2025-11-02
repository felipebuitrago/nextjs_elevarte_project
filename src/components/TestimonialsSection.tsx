"use client";
import { cn } from '@/lib/utils';
import { Marquee } from './ui/marquee';
import { Star } from 'lucide-react';

export default function Testimonials({ testimonials }: { testimonials: any[] }) {
  return (
    <section
      id='testimonials-section'
      className="relative min-h-screen pt-20 px-4 md:px-8"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl lg:text-8xl font-Dongle text-[#8B4513] mb-16">
            Testimonios
          </h2>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee className="[--duration:20s]">
              {testimonials.map((review, index) => (
                <ReviewCard key={`review-line1-${index}`} {...review} />
              ))}
            </Marquee>
            <Marquee reverse className="[--duration:20s]">
              {testimonials.map((review, index) => (
                <ReviewCard key={`review-line2-${index}`} {...review} />
              ))}
            </Marquee>
            <Marquee className="[--duration:20s]">
              {testimonials.map((review, index) => (
                <ReviewCard key={`review-line3-${index}`} {...review} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

const ReviewCard = ({
  name,
  body,
  rating,
}: {
  name: string;
  body: string;
  rating: number;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 overflow-hidden",
        // light styles
        "backdrop-blur-xl bg-white/40 rounded-3xl p-8 border border-white/50"
      )}
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-col">
          <figcaption className="text-2xl text-left font-Zain text-[#8B4513] leading-none">
            {name}
          </figcaption>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4"
              fill={i < rating ? "#d97706" : "#9ca3af"}
              stroke={i < rating ? "#d97706" : "#9ca3af"}
            />
          ))}
        </div>
      </div>
      <blockquote className="mt-2 text-sm font-DMSans text-left">{body}</blockquote>
    </figure>
  );
}