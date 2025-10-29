"use client";
import { cn } from '@/lib/utils';
import { Marquee } from './ui/marquee';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <>
      <section
        id='testimonials-section'
        className="relative mpy-20 px-4 md:px-8"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-6xl lg:text-8xl font-Dongle text-[#8B4513] mb-4">
              Testimonios
            </h2>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              <Marquee className="[--duration:20s]">
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee reverse className="[--duration:20s]">
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee className="[--duration:20s]">
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
    rating: 5,
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
    rating: 4,
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
    rating: 5,
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
    rating: 5,
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
    rating: 4,
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
    rating: 5,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

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
          <figcaption className="text-2xl font-Zain text-[#8B4513]">
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