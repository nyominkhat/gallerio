export default function GroupLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <>{modal}</>
      {children}
    </>
  );
}
