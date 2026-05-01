import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="w-full flex flex-col gap-6 pt-10">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          POST /contact
        </h1>
        <p className="text-muted-foreground">
          Send a direct message payload to the server.
        </p>
      </div>
      
      <ContactForm />
    </div>
  );
}
