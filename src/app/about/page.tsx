import { JsonViewer } from "@/components/JsonViewer";

export default function About() {
  const data = {
    developer_id: "rasal_p",
    bio: "MERN Stack Developer with hands-on experience building scalable web and mobile applications using React.js and React Native.",
    focus_areas: [
      "RESTful API Development",
      "Database Optimization (MongoDB)",
      "Scalable Web & Mobile Apps",
      "ERP System Enhancement"
    ],
    background: "Proficient in developing APIs with Node.js and Fastify, and implementing efficient database operations. Experienced in delivering new features, optimizing performance, and resolving bugs in production ERP systems.",
    education: {
      degree: "Diploma in Computer Engineering",
      institution: "Ma'din PolyTechnic College, Malappuram",
      timeline: "08/2020 - 05/2023"
    },
    languages: ["Malayalam", "English", "Tamil"]
  };

  return (
    <div className="w-full flex flex-col gap-6 pt-10">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          GET /about
        </h1>
        <p className="text-muted-foreground">
          Retrieving developer biography and background information...
        </p>
      </div>
      
      <JsonViewer data={data} title="/about" status={200} delay={0.2} />
    </div>
  );
}
