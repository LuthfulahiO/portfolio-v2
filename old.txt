"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const portfolioAscii = `
   ___         _    __ _ _     
  / _ \\___ _ _| |_ / _| (_)___ 
 / /_)/ _ \\ '_|  _|  _| | / _ \\
/ ___/ .__/_|  \\__|_| |_|_\\___/
\\/   |_|                       
`;

const visionAscii = `
    ┌─────────┐  ╭──────╮  
    │  ┌───┐  │  │ ╭──╮ │  
    │  │ • │  │  │ │••│ │  
    │  └───┘  │  │ ╰──╯ │  
    └─────────┘  ╰──────╯  
   VISION        CLARITY   
`;

const aiAscii = `
    _    ___ 
   /_\\  |_ _|
  / _ \\  | | 
 /_/ \\_\\|___|
`;

const PortfolioIntro = () => {
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Terminal Header */}
      <div className="flex flex-col gap-y-2 border-b border-border p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto p-4">
          {/* Initial Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col items-start justify-center"
          >
            <pre className="font-mono text-primary mb-6">{portfolioAscii}</pre>

            <motion.div
              className="text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Over the years, I&apos;ve built countless iterations of my
              portfolio...
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-muted-foreground block"
            >
              <span>• Fully developed and launched websites</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-muted-foreground block"
            >
              <span>• Partial developments that didn&apos;t quite make it</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-muted-foreground block mb-12"
            >
              <span>• Numerous ambitious Figma designs left unfinished</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-sm">Scroll to reveal more</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </motion.div>
          </motion.div>

          {/* Reflection Section */}
          <motion.div className="min-h-screen flex flex-col items-start justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <pre className="font-mono text-primary mb-6">{visionAscii}</pre>
            </motion.div>

            <motion.div
              className="text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              One factor remained consistent across all these attempts: Taste.
              My vision for a portfolio has always been dynamic—something that
              truly captures who I am as a professional, product engineer,
              frontend developer, founding engineer, and someone known for
              simply getting things done.
            </motion.div>

            <motion.div
              className="text-lg mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Yet, balancing clarity, creativity, and conciseness without
              overwhelming visitors has proven to be incredibly challenging,
              even when equipped with some of the best designs.
            </motion.div>
          </motion.div>

          {/* AI Section */}
          <motion.div className="min-h-screen flex flex-col items-start justify-center">
            <pre className="font-mono text-primary mb-6">{aiAscii}</pre>

            <motion.div
              className="text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              But now, I&apos;ve discovered a solution: Artificial Intelligence
              🤖
            </motion.div>

            <motion.div
              className="text-lg mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              By leveraging advanced large language models, I&apos;ve trained a
              personalized AI with extensive context about me—covering every
              iteration of my resume, detailed recommendations from managers and
              colleagues, my skills, experiences, achievements, and even my
              professional growth areas. It&apos;s all readily accessible for
              you to explore interactively.
            </motion.div>

            <motion.div
              className="mt-8 p-4 bg-accent/10 rounded-lg border border-border w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="text-lg font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Want to know if I&apos;m a good fit for your role? Simply paste
                your job description and ask:
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-primary mt-4 block"
              >
                <span>
                  • &quot;Is Luthfulahi a good fit for this position?&quot;
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-primary block"
              >
                <span>
                  • &quot;Why should or shouldn&apos;t I hire him?&quot;
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-primary block"
              >
                <span>
                  • &quot;Given our company&apos;s profile, would we benefit
                  from having Luthfulahi onboard?&quot;
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className="text-lg mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              This AI is unbiased and data-driven, crafted specifically to help
              you genuinely evaluate how my expertise aligns with your
              opportunity—whether it&apos;s a job, a freelance gig, a speaking
              engagement, or even just an insightful conversation.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Button className="mt-8" variant="default" size="lg">
                Start the Conversation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="border-t border-border p-4">
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Luthfulahi
        </span>
      </div>
    </div>
  );
};

export default PortfolioIntro;
