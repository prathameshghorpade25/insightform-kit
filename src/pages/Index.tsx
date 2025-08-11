import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Layers, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Hero Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Hero Section */}
      <motion.section 
        className="flex-1 flex items-center justify-center px-6 py-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Build Forms That
              <span className="block bg-gradient-brand bg-clip-text text-transparent">
                Tell Stories
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create stunning interactive forms with unique question types. 
              Drag, drop, and design experiences that engage your audience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/builder">
              <Button variant="gradient" size="xl" className="group">
                Start Building
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="glass" size="xl">
              View Examples
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <div className="glass rounded-lg p-6 hover:bg-glass-highlight transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Unique Question Types</h3>
              <p className="text-muted-foreground">
                Categorize, Cloze, and Comprehension questions that go beyond basic forms.
              </p>
            </div>

            <div className="glass rounded-lg p-6 hover:bg-glass-highlight transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Drag & Drop Builder</h3>
              <p className="text-muted-foreground">
                Intuitive interface to create and reorder questions with ease.
              </p>
            </div>

            <div className="glass rounded-lg p-6 hover:bg-glass-highlight transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Beautiful Experience</h3>
              <p className="text-muted-foreground">
                Typeform-style interface that respondents love to use.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center py-8 text-muted-foreground"
      >
        <p>Built with React, TypeScript, and modern design principles</p>
      </motion.footer>
    </div>
  );
};

export default Index;