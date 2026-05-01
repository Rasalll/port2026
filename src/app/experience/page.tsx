import { JsonViewer } from "@/components/JsonViewer";

export default function Experience() {
  const data = [
    {
      role: "Full Stack Developer",
      company: "Necttos Private Limited | Pattambi, Palakkad, Kerala",
      duration: "07/2025 - 03/2026",
      responsibilities: [
        "Developed and enhanced multiple modules in a college ERP system using React.js and React Native, improving usability across web and mobile platforms.",
        "Built and integrated RESTful APIs using Node.js and Fastify, enabling efficient communication between frontend and backend.",
        "Worked extensively with MongoDB for data management, designing and handling structured and scalable data models.",
        "Implemented new features, resolved bugs, and optimized existing workflows to improve system performance and user experience."
      ]
    },
    {
      role: "MERN Stack Intern",
      company: "Luminar TechnoLab | Calicut, India",
      duration: "06/2024 - 01/2025",
      responsibilities: [
        "Built and maintained 3+ responsive web applications, improving user engagement and reducing page load times by 30%.",
        "Created and consumed RESTful APIs to ensure smooth data exchange between frontend and backend.",
        "Implemented JWT authentication and role-based access control for secure application workflows.",
        "Designed responsive UIs with Bootstrap and Tailwind CSS following mobile-first design principles."
      ]
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6 pt-10">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          GET /experience
        </h1>
        <p className="text-muted-foreground">
          Retrieving professional timeline...
        </p>
      </div>
      
      <JsonViewer data={data} title="/experience?sort=desc" status={200} delay={0.2} />
    </div>
  );
}
