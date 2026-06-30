import React from 'react';

export const SystemsSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden bg-black text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500">
          Core Optimization & Implementation
        </h2>
        <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl">
          We seek critical review on our core matrix stream update logic. 
          Below is the exact pseudo-code driving the recurrent updates.
        </p>

        {/* MacOS-style Terminal Window - Glassmorphic */}
        <div className="w-full rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl shadow-black/50">
          {/* Window Header */}
          <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-zinc-700/80 border border-zinc-600/50"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-700/80 border border-zinc-600/50"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-700/80 border border-zinc-600/50"></div>
            </div>
            <div className="mx-auto text-xs font-medium text-gray-400 font-mono flex-1 text-center pr-12">
              modus_x_core.py
            </div>
          </div>
          
          {/* Code Content */}
          <div className="p-6 md:p-8 overflow-x-auto text-sm md:text-base font-mono leading-relaxed text-gray-200">
            <pre className="!bg-transparent !m-0 !p-0">
              <code>
<span className="text-zinc-500 italic"># Modus_X Matrix Stream Update</span>
<span className="text-zinc-400">def</span> <span className="text-zinc-200">matrix_stream_forward</span>(x, state_H):
    k, v, q, gate = compute_projections(x)
    
    <span className="text-zinc-500 italic"># Delta rule update</span>
    delta = v - state_H @ k
    state_H_new = state_H + gate * torch.outer(delta, k)
    
    <span className="text-zinc-500 italic"># Retrieval</span>
    out_H = state_H_new @ q
    <span className="text-zinc-400">return</span> out_H, state_H_new
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemsSection;