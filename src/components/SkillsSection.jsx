import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

import htmlIcon from "@/assets/icons/html.png";
import cssIcon from "@/assets/icons/css.png";
import sassIcon from "@/assets/icons/saas.png";
import jsIcon from "@/assets/icons/javascript.png";
import tsIcon from "@/assets/icons/typescript.png";
import reactIcon from "@/assets/icons/react.png";
import nextjsIcon from "@/assets/icons/nextjs.png";
import nodejsIcon from "@/assets/icons/nodejs.png";
import expressIcon from "@/assets/icons/express.png";
import mongodbIcon from "@/assets/icons/mongodb.png";
import postgresqlIcon from "@/assets/icons/postgresql.png";
import graphqlIcon from "@/assets/icons/graphql.png";
import javaIcon from "@/assets/icons/java.png";
import webflowIcon from "@/assets/icons/webflow.png";
import pythonIcon from "@/assets/icons/python.png";
import gitIcon from "@/assets/icons/git.png";
import githubIcon from "@/assets/icons/github.png";
import dockerIcon from "@/assets/icons/docker.png";
import firebaseIcon from "@/assets/icons/firebase.png";
import vscodeIcon from "@/assets/icons/vscode.png";
import clerkIcon from "@/assets/icons/cleark.png";
import SQLIcon from "@/assets/icons/sql.png";
import MySQLIcon from "@/assets/icons/mysql.png";

const skills = [
  { name: "HTML5", category: "frontend", icon: "html" },
  { name: "CSS3", category: "frontend", icon: "css" },
  { name: "Sass", category: "frontend", icon: "sass" },
  { name: "JavaScript", category: "frontend", icon: "javascript" },
  { name: "Webflow", category: "frontend", icon: "webflow" },
  { name: "TypeScript", category: "frontend", icon: "typescript" },
  { name: "React", category: "frontend", icon: "react" },
  { name: "Next.js", category: "frontend", icon: "nextjs" },
  { name: "Node.js", category: "backend", icon: "nodejs" },
  { name: "Express", category: "backend", icon: "express" },
  { name: "MongoDB", category: "backend", icon: "mongodb" },
  { name: "PostgreSQL", category: "backend", icon: "postgresql" },
  { name: "GraphQL", category: "backend", icon: "graphql" },
  { name: "Java", category: "backend", icon: "java" },
  { name: "Python", category: "backend", icon: "python" },
  { name: "Git", category: "tools", icon: "git" },
  { name: "GitHub", category: "tools", icon: "github" },
  { name: "Docker", category: "tools", icon: "docker" },
  { name: "Firebase", category: "tools", icon: "firebase" },
  { name: "VS Code", category: "tools", icon: "vscode" },
  { name: "Clerk", category: "tools", icon: "clerk" },
  { name: "SQL", category: "tools", icon: "sql" },
  { name: "MySQL", category: "tools", icon: "mysql" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
];

const iconImages = {
  html: htmlIcon,
  css: cssIcon,
  sass: sassIcon,
  javascript: jsIcon,
  typescript: tsIcon,
  react: reactIcon,
  nextjs: nextjsIcon,
  nodejs: nodejsIcon,
  express: expressIcon,
  mongodb: mongodbIcon,
  postgresql: postgresqlIcon,
  graphql: graphqlIcon,
  java: javaIcon,
  webflow: webflowIcon,
  python: pythonIcon,
  git: gitIcon,
  github: githubIcon,
  docker: dockerIcon,
  firebase: firebaseIcon,
  vscode: vscodeIcon,
  clerk: clerkIcon,
  sql: SQLIcon,
  mysql: MySQLIcon,
};

const SkillChip = ({ skill }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border hover:border-primary/35 transition-colors">
    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
      <img src={iconImages[skill.icon]} alt="" className="w-6 h-6 object-contain" />
    </div>
    <span className="text-sm font-medium">{skill.name}</span>
  </div>
);

const Marquee = ({ items, reverse = false }) => {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max gap-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}
      >
        {loop.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border"
          >
            <img src={iconImages[skill.icon]} alt="" className="w-5 h-5 object-contain" />
            <span className="text-sm whitespace-nowrap">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Skills"
          title="Tools I use to"
          highlight="ship with confidence."
          description="A focused stack for product work — frontend craft, solid backends, and the tooling that keeps delivery calm."
        />

        <div className="space-y-3 mb-12">
          <Marquee items={skills.slice(0, 12)} />
          <Marquee items={skills.slice(12)} reverse />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`cursor-pointer px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
              >
                <SkillChip skill={skill} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
