"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      <div className="flex">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char}
                </span>
              ))}
              {/* Add space only if it's NOT the last word */}
              {idx < wordsArray.length - 1 ? (
                <span className="inline-block">&nbsp;</span>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    // REMOVED: my-6 (caused vertical gaps)
    // REMOVED: space-x-1 (caused cursor gap)
    <div className={cn("flex items-center", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          // Cursor settings
          "block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500 ml-1",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};