import React from 'react';

const faqData = [
  {
    question: "What is Convolution?",
    answer: 
      "Convolution is the annual tech fest organised by JUEE, where technology, creativity, and innovation come together. It features exciting events, workshops, competitions, and opportunities to showcase talent.",
  },
  {
    question: "When and where is Convolution happening?",
    answer: 
      "Convolution will take place from 20th to 22nd February, 2025 at the Department of Electrical Engineering, Jadavpur University. Further updates about the time, date and venue of specific events will be available on our website soon. Stay tuned for more updates !! ",
  },
  {
    question: "Who can participate in Convolution?",
    answer: 
      "Any student enrolled in any undergraduate programme interested in exploring, engaging in enthralling activities and undertaking mind boggling challenges are welcome to participate in Convolution. ",
  },
  {
    question: "How do I register on the website?",
    answer: 
      "To register for any event, click on the “Register” button and create an account. You will receive a verification email, which may land in your spam folder. After verifying your email, log in , using the credentials given during registration. Voilà! You are all set to participate in the events!",
  },
  {
    question: "Is there any registration fee?",
    answer: 
      "No, the registrations for the events are completely free of cost.",
  },
];

export default function FaqSection() {
  return (
    <div id="faq" className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center pt-24 pb-12">
      <div className="absolute inset-0 z-0 opacity-15" 
           style={{ backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/*Heading*/}
      <div className="relative z-10 text-center mb-16 space-y-2">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          Frequently Asked Questions
        </h2>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full opacity-70"></div>
      </div>

      {/* Faq */}
      <div className="relative z-10 w-full max-w-[800px] px-6 flex flex-col gap-y-4">
        {faqData.map((data, id) => (
          <details
            key={id}
            className="group relative overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 transition-all duration-500 ease-in-out hover:bg-white/[0.05] hover:border-white/20 open:bg-white/[0.07] open:border-cyan-500/30 open:shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)] [interpolate-size:allow-keywords] [&::details-content]:[height:0] [&::details-content]:overflow-y-clip [&::details-content]:[transition:all_400ms_ease-out] [&[open]::details-content]:[height:auto]"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 to-purple-500 opacity-0 transition-opacity duration-300 group-open:opacity-100"></div>

            <summary className="flex items-center justify-between w-full px-6 py-5 cursor-pointer list-none select-none outline-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg md:text-xl font-medium text-slate-300 transition-colors duration-300 group-hover:text-white group-open:text-cyan-200">
                {data.question}
              </h3>

              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 transition-all duration-300 group-open:bg-cyan-500/20 group-open:border-cyan-500/50 group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="w-4 h-4 text-slate-400 transition-colors duration-300 group-open:text-cyan-400"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </summary>

    
            <div className="px-6 pb-6 pt-0">
              <div className="w-full h-[1px] bg-white/5 mb-4"></div>
              
              <div className="text-slate-400 leading-relaxed font-light tracking-wide text-sm md:text-base 
                              starting:blur-sm starting:opacity-0 starting:-translate-y-2 
                              transition-all duration-500 ease-out">
                {data.answer}
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}