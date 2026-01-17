import React from 'react';

export default function FaqSection() {
  return (
    <div className="[interpolate-size:allow-keywords] bg-gradient-to-br from-black to-black/95 min-h-screen flex flex-col place-items-center gap-8 pt-16">
      <h2 className="text-3xl font-semibold bg-radial to-zinc-500/50 from-gray-50/80 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      <div className="w-[600px] max-h-[80vh] overflow-y-auto p-6 flex flex-col gap-y-4">
        {/* Item 1 */}
        <details
          name="example"
          className="group rounded-lg transition-all duration-200 ease-in-out ring-2 ring-zinc-800/40 ring-[1px] ring-offset-[1px] ring-offset-black/40 hover:bg-zinc-900/20 
                    [&::details-content]:[height:0] [&::details-content]:overflow-y-clip [&::details-content]:[transition:all_475ms_allow-discrete]
                    [&[open]::details-content]:[height:auto] [&[open]]:bg-gradient-to-br [&[open]]:from-zinc-900/10 [&[open]]:via-zinc-800/20 [&[open]]:to-zinc-900/10"
        >
          <summary className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-zinc-400 w-full px-6 py-3 h-auto justify-between hover:bg-transparent cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-medium transition-colors duration-200 text-left text-zinc-600/70 [details[open]_&]:text-zinc-200">
              What is interpolate-size?
            </h3>
            <div className="p-0.5 rounded-full flex-shrink-0 transition-transform duration-400 scale-110 text-zinc-500 [details[open]_&]:rotate-180 [details[open]_&]:text-zinc-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </summary>
          <div className="overflow-hidden">
            <div className="px-6 pb-4 pt-2 starting:blur-xs starting:opacity-0 starting:-translate-y-1 [details:not([open])_&]:opacity-20 [details:not([open])_&]:-translate-y-1 [details:not([open])_&]:blur-xs blur-none translate-y-0 opacity-100 transition-all duration-500">
              <p className="text-sm text-zinc-500 leading-relaxed">
                The interpolate-size CSS property allows you to enable
                animations and transitions between length-percentage values and
                intrinsic size values like auto, fit-content, and max-content.
              </p>
            </div>
          </div>
        </details>

        {/* Item 2 */}
        <details
          name="example"
          className="group rounded-lg transition-all duration-200 ease-in-out ring-2 ring-zinc-800/40 ring-[1px] ring-offset-[1px] ring-offset-black/40 hover:bg-zinc-900/20 
                    [&::details-content]:[height:0] [&::details-content]:overflow-y-clip [&::details-content]:[transition:background_475ms,content-visibility_475ms_allow-discrete,height_475ms]
                    [&[open]::details-content]:[height:auto] [&[open]]:bg-gradient-to-br [&[open]]:from-zinc-900/10 [&[open]]:via-zinc-800/20 [&[open]]:to-zinc-900/10"
        >
          <summary className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-zinc-400 w-full px-6 py-3 h-auto justify-between hover:bg-transparent cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-medium transition-colors duration-200 text-left text-zinc-600/70 [details[open]_&]:text-zinc-200">
              How does it work?
            </h3>
            <div className="p-0.5 rounded-full flex-shrink-0 transition-transform duration-400 scale-110 text-zinc-500 [details[open]_&]:rotate-180 [details[open]_&]:text-zinc-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </summary>
          <div className="overflow-hidden">
            <div className="px-6 pb-4 pt-2 starting:blur-xs starting:opacity-0 starting:-translate-y-1 [details:not([open])_&]:opacity-20 [details:not([open])_&]:-translate-y-1 [details:not([open])_&]:blur-xs blur-none translate-y-0 opacity-100 transition-all duration-500">
              <p className="text-sm text-zinc-500 leading-relaxed">
                The browser can now smoothly animate between fixed heights and
                intrinsic sizes, length values and fit-content, percentages and
                max-content using the ::details-content pseudo-element.
              </p>
            </div>
          </div>
        </details>

        {/* Item 3 */}
        <details
          name="example"
          className="group rounded-lg transition-all duration-200 ease-in-out ring-2 ring-zinc-800/40 ring-[1px] ring-offset-[1px] ring-offset-black/40 hover:bg-zinc-900/20 
                    [&::details-content]:[height:0] [&::details-content]:overflow-y-clip [&::details-content]:[transition:background_475ms,content-visibility_475ms_allow-discrete,height_475ms]
                    [&[open]::details-content]:[height:auto] [&[open]]:bg-gradient-to-br [&[open]]:from-zinc-900/10 [&[open]]:via-zinc-800/20 [&[open]]:to-zinc-900/10"
        >
          <summary className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-zinc-400 w-full px-6 py-3 h-auto justify-between hover:bg-transparent cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-medium transition-colors duration-200 text-left text-zinc-600/70 [details[open]_&]:text-zinc-200">
              Implementation example
            </h3>
            <div className="p-0.5 rounded-full flex-shrink-0 transition-transform duration-400 scale-110 text-zinc-500 [details[open]_&]:rotate-180 [details[open]_&]:text-zinc-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </summary>
          <div className="overflow-hidden">
            <div className="px-6 pb-4 pt-2 starting:blur-xs starting:opacity-0 starting:-translate-y-1 [details:not([open])_&]:opacity-20 [details:not([open])_&]:-translate-y-1 [details:not([open])_&]:blur-xs blur-none translate-y-0 opacity-100 transition-all duration-500">
              <p className="text-sm text-zinc-500 leading-relaxed mb-3">
                Here's the key CSS converted to Tailwind arbitrary classes:
              </p>
              <div className="bg-zinc-950 border border-zinc-800/40 text-zinc-100 rounded-lg p-3 text-xs font-mono overflow-x-auto">
                <div className="text-emerald-400">
                  /* Enable interpolate-size */
                </div>
                <div className="text-zinc-300">
                  [interpolate-size:allow-keywords]
                </div>
                <br />
                <div className="text-emerald-400">/* Exclusive behavior */</div>
                <div className="text-zinc-300">name="example"</div>
                <br />
                <div className="text-emerald-400">
                  /* Target ::details-content pseudo-element */
                </div>
                <div className="text-zinc-300">
                  [&::details-content]:[height:0]
                </div>
                <div className="text-zinc-300">
                  [&[open]::details-content]:[height:auto]
                </div>
                <br />
                <div className="text-emerald-400">/* Smooth transitions */</div>
                <div className="text-zinc-300">
                  [&::details-content]:[transition:background_475ms,content-visibility_475ms_allow-discrete,height_475ms]
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}