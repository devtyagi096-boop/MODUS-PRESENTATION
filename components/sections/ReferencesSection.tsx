import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Link as LinkIcon, ExternalLink } from 'lucide-react';

const references = [
  {
    authors: "Gu, A., & Dao, T.",
    year: "2023",
    title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
    venue: "arXiv preprint arXiv:2312.00752",
    link: "https://arxiv.org/abs/2312.00752"
  },
  {
    authors: "Beck, M. et al.",
    year: "2024",
    title: "xLSTM: Extended Long Short-Term Memory",
    venue: "arXiv preprint arXiv:2405.04517",
    link: "https://arxiv.org/abs/2405.04517"
  },
  {
    authors: "Schmidhuber, J.",
    year: "1992",
    title: "Learning to Control Fast-Weight Memories: An Alternative to Dynamic Recurrent Networks",
    venue: "Neural Computation",
    link: "https://idsia.ch/~juergen/fastweight.html"
  },
  {
    authors: "Schlag, I., Irie, K., & Schmidhuber, J.",
    year: "2021",
    title: "Linear Transformers Are Secretly Fast Weight Programmers",
    venue: "ICML 2021",
    link: "https://arxiv.org/abs/2102.11174"
  },
  {
    authors: "Katharopoulos, A. et al.",
    year: "2020",
    title: "Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention",
    venue: "ICML",
    link: "https://arxiv.org/abs/2006.16236"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const ReferencesSection: React.FC = () => {
  return (
    <section className="flex flex-col h-full min-h-screen w-full items-center justify-center p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 relative overflow-hidden snap-center">
      
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-5xl z-10"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-xl">
            <BookOpen className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Foundational References
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {references.map((ref, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-slate-800/30 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex-1 space-y-2">
                  <p className="text-slate-300 font-medium">
                    <span className="text-slate-400 mr-2">{ref.authors}</span>
                    ({ref.year}).
                  </p>
                  <h3 className="text-xl font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
                    {ref.title}
                  </h3>
                  <p className="text-slate-400 italic text-sm">
                    {ref.venue}
                  </p>
                </div>
                
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-blue-500/20 hover:text-blue-300 text-slate-300 border border-slate-600/50 transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm font-medium">View Paper</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
