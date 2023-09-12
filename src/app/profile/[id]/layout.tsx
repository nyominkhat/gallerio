import ProfileLayoutProvider from "@/providers/ProfileLayoutProvider";

const ProfileLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  return (
    <main>
      <ProfileLayoutProvider userId={params.id}>
        {children}
      </ProfileLayoutProvider>
    </main>
  );
};

export default ProfileLayout;
