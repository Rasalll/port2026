import { JsonViewer } from "@/components/JsonViewer";

export default function Home() {
  const data = {
    name: "Rasal P",
    role: "MERN Stack Developer",
    status: "Building scalable web & mobile apps",
    location: "Malappuram, Kerala, India",
    primary_stack: ["React.js", "React Native", "Node.js", "MongoDB"],
    system_uptime: "99.9%",
    available_for_hire: true,
    message: "Welcome to my interactive portfolio. Use the endpoints on the left to navigate.",
    links: {
      github: "https://github.com/rasalp",
      linkedin: "https://linkedin.com/in/rasal-pookkodan-8a0212245",
      email: "mailto:pookodanrasal@gmail.com"
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 pt-10">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          System Initialized
        </h1>
        <p className="text-muted-foreground">
          Fetching primary user object...
        </p>
      </div>
      
      <JsonViewer data={data} title="/status" status={200} delay={0.2} />
    </div>
  );
}
