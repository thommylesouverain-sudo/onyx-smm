import { AppLayout } from "@/components/layout/AppLayout";

export default function NewOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}