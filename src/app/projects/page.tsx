import { JsonViewer } from "@/components/JsonViewer";

export default function Projects() {
  const data = [
    {
      id: "proj_doctor_appointment",
      name: "Doctor Appointment Application",
      description: "A full-stack doctor appointment platform with role-based access and payment integration.",
      tech_stack: ["React.js", "Bootstrap 5", "PayPal API", "Node.js"],
      features: [
        "Designed a responsive UI for a smooth cross-device user experience.",
        "Developed authentication and role-based access control for Admin, Doctor, and Patient roles.",
        "Implemented doctor listings, appointment scheduling, and PayPal payment integration.",
        "Enabled time-slot-based booking where patients can only book within doctors' available slots."
      ]
    },
    {
      id: "proj_ecommerce",
      name: "E-Commerce Application",
      description: "A feature-rich e-commerce frontend built with React.js and Redux Toolkit.",
      tech_stack: ["React.js", "Redux Toolkit", "RESTful APIs"],
      features: [
        "Used Redux Toolkit for managing global application state including user authentication, wishlist, and cart.",
        "Implemented wishlist, cart management, and dynamic cart total calculation with real-time updates."
      ]
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6 pt-10">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          GET /projects
        </h1>
        <p className="text-muted-foreground">
          Querying project database records...
        </p>
      </div>
      
      <JsonViewer data={data} title="/projects?limit=3" status={200} delay={0.2} />
    </div>
  );
}
