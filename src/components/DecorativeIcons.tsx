import { Cpu, Bot, GitBranch, Activity, CircuitBoard, Network} from "lucide-react";

export default function DecorativeIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 z-1">

      {/* AI Core */}
      <Cpu
        className="absolute top-[15vh] left-[7vw] w-14 h-14 text-purple-400/25
        animate-[pulse_4s_ease-in-out_infinite]"
      />

      {/* Robotics */}
      <Bot
        className="absolute top-[35vh] left-[19vw] w-11 h-11 text-cyan-400/60
        animate-[float_6s_ease-in-out_infinite]"
      />

      {/* Automation Flow */}
      <GitBranch
        className="absolute bottom-[10vh] right-[10vw] w-10 h-10 text-purple-300
        animate-[drift_8s_linear_infinite]"
      />

      {/* Sensor Signal */}
      <Activity
        className="absolute top-[60vh] right-[15vw] w-14 h-14 text-purple-300
        animate-[signal_5s_ease-in-out_infinite]"
      />

      {/* Electronics */}
      <CircuitBoard
        className="absolute bottom-[8vh] left-[11vw] w-12 h-12 text-cyan-300/35
        animate-[spin_20s_linear_infinite]"
      />

      {/* Neural Network */}
      <Network
        className="absolute top-[8vh] right-[7vw] w-11 h-11 text-purple-400
        animate-[breathe_7s_ease-in-out_infinite]"
      />

    </div>
  );
}