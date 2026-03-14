import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AiSuggestionData } from "@/services/ai";
import { getAiSuggestions } from "@/services/ai";
import { toast } from "sonner";
import { 
  IconSparkles, 
  IconSearch, 
  IconPercentage, 
  IconFileCheck, 
  IconAlertTriangle,
  IconLoader
} from "@tabler/icons-react";
import Chatbot from "@/components/custom/ChatBot";

export default function AiSuggestionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AiSuggestionData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a product name or serial number");
      return;
    }

    setLoading(true);
    setData(null);

    try {
      const result = await getAiSuggestions(searchQuery);
      setData(result);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch AI suggestions");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col items-center justify-start p-6 md:p-10 w-full bg-white dark:bg-zinc-950">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl flex flex-col items-center mt-10"
          >
            <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <IconSparkles size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center mb-4">
              AI Warranty Insights
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-2xl mb-10 text-lg">
              Unlock intelligent predictions about your claims. Discover missing documents and uncover hidden reasons for rejection before they happen.
            </p>

            <form onSubmit={handleSearch} className="w-full max-w-2xl relative mb-16">
              <div className="relative flex items-center w-full">
                <IconSearch className="absolute left-4 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Enter product name or serial number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-40 py-4 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-lg shadow-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <IconLoader className="animate-spin" size={20} />
                      Thinking
                    </>
                  ) : (
                    "Analyze"
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          <AnimatePresence mode="wait">
            {data && !loading && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Result Title */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-3 mb-2 flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    Results for <span className="text-purple-500 font-black">"{data.warrantyDetails?.name || searchQuery}"</span>
                  </h2>
                </motion.div>

                {/* Claim Predictor */}
                <motion.div variants={itemVariants} className="col-span-1 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 bg-white dark:bg-zinc-900 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <IconPercentage size={120} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-6 w-full text-center z-10">Approval Probability</h3>
                  
                  <div className="relative w-40 h-40 flex items-center justify-center z-10">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" className="stroke-current text-gray-100 dark:text-gray-800" strokeWidth="12" fill="transparent" />
                      <motion.circle 
                        cx="80" cy="80" r="70" 
                        className={`stroke-current ${data.claimPredictor > 70 ? 'text-green-500' : data.claimPredictor > 40 ? 'text-yellow-500' : 'text-red-500'}`} 
                        strokeWidth="12" 
                        strokeLinecap="round" 
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 70}
                        initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - data.claimPredictor / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-gray-900 dark:text-white">{data.claimPredictor}%</span>
                    </div>
                  </div>
                  <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400 z-10">
                    {data.claimPredictor > 70 ? "High chance of approval. Make sure to attach required docs." : 
                     data.claimPredictor > 40 ? "Moderate chance. The claim might require further investigation." : 
                     "Low chance. Prepare for possible rejection."}
                  </p>
                </motion.div>

                {/* Docs Needed */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 border border-green-200 dark:border-green-900/30 rounded-3xl p-6 bg-green-50/50 dark:bg-green-900/10 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                      <IconFileCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Required Documents</h3>
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    {data.documentSuggestions.map((doc, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                        key={idx} 
                        className="flex items-start gap-3 bg-white dark:bg-zinc-900/50 p-4 rounded-2xl border border-green-100 dark:border-green-800/20"
                      >
                        <div className="mt-1 w-5 h-5 rounded-full bg-green-500 flex flex-shrink-0 items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{doc}</span>
                      </motion.div>
                    ))}
                    {data.documentSuggestions.length === 0 && (
                      <p className="text-gray-500 italic">No specific documents identified.</p>
                    )}
                  </div>
                </motion.div>

                {/* Rejection Reasons */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-3 border border-red-200 dark:border-red-900/30 rounded-3xl p-6 bg-red-50/50 dark:bg-red-900/10 shadow-sm flex flex-col mt-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
                      <IconAlertTriangle size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Potential Rejection Factors</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Be aware of these common pitfalls</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.rejectionReasons.map((reason, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + (idx * 0.1) }}
                        key={idx} 
                        className="flex items-start gap-3 bg-white dark:bg-zinc-900/50 p-4 rounded-2xl border border-red-100 dark:border-red-800/20 shadow-sm"
                      >
                         <IconAlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{reason}</span>
                      </motion.div>
                    ))}
                    {data.rejectionReasons.length === 0 && (
                      <p className="text-gray-500 italic">No specific rejection reasons identified.</p>
                    )}
                  </div>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SidebarInset>
      <Chatbot />
    </SidebarProvider>
  );
}
