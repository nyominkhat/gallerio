import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import LayoutProvider from "@/providers/LayoutProvider";
import QueryProvider from "@/providers/QueryClientProvider";

export default function GroupLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <QueryProvider>
        <AuthProvider>
          <LayoutProvider>{children}</LayoutProvider>

          {modal}
        </AuthProvider>
      </QueryProvider>

      <Toaster />
    </>
  );
}
