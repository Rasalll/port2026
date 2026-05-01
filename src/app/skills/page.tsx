import { JsonViewer } from "@/components/JsonViewer";

export default function Skills() {
  const data = {
    frontend: ["React.js", "React Native", "HTML5", "JavaScript (ES6+)", "TypeScript", "Redux Toolkit", "Bootstrap 5", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "Fastify", "REST APIs", "JWT", "Middleware"],
    database: ["MongoDB", "Mongoose"],
    tools: ["Git", "GitHub", "Postman", "Figma", "Axios", "Responsive Web Design"]
  };

  return (
    <div className="w-full flex flex-col gap-6 pt-10">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          GET /skills
        </h1>
        <p className="text-muted-foreground">
          Fetching technical competencies matrix...
        </p>
      </div>
      
      <JsonViewer data={data} title="/skills" status={200} delay={0.2} />
    </div>
  );
}
